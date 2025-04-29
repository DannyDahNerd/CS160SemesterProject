import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { Models } from "appwrite";
import MapMarker from "@/components/shared/MapMarker";
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function MapPage() {
  const { data, isPending: isPostLoading,} = useGetRecentPosts();

  return (
    <div className="w-full h-[calc(100vh-23vh)] md:h-screen">
      <MapContainer
        center={[36.9645, -122.0167]}
        zoom={9}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MarkerClusterGroup>
          {data?.documents.map((post: Models.Document) => (
            <MapMarker key={post.$id} post={post} />
          ))}
        </MarkerClusterGroup>

        {isPostLoading && !data && <Loader />}
      </MapContainer>
    </div>
  );
}