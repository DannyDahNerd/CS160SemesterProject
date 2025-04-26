import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { Models } from "appwrite";
import MapMarker from "@/components/shared/MapMarker";

export default function MapPage() {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div
      className="w-full h-[calc(100vh-23vh)] md:h-screen" // 92px ≈ your bottom bar height
    >
      <MapContainer
        center={[36.9645, -122.0167]}
        zoom={9}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.documents.map((post: Models.Document) => (
              // <PostCard post={post} key={post.caption} />
              <MapMarker post={post} key={post.caption} />
            ))}
          </ul>
        )}
      </MapContainer>
    </div>
  );
}
