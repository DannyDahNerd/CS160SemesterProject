import { useUserContext } from "@/context/AuthContext";
import { geocodeAddress, timeAgo } from "@/lib/utils";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};
const MapMarker = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const [coords, setCoords] = useState<{
    name: string;
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!post.creator) return;

    async function fetchCoords() {
      try {
        const result = await geocodeAddress(post.location);
        setCoords(result);
      } catch (error) {
        console.error("Failed to geocode address:", post.location);
      }
    }

    fetchCoords();
  }, [post.creator, post.location]);

  if (!coords) {
    return null; // Don't render marker until coordinates are ready
  }
  return (
    <Marker position={[coords.lat, coords.lng]}>
      <Popup>
        {coords.name} <br />
        {post.caption} <br />
        <Link to={`/posts/${post.$id}`}> View Event</Link>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
