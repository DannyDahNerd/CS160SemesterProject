import { useUserContext } from "@/context/AuthContext";
import { geocodeAddress } from "@/lib/utils";
import { Marker, Popup } from "react-leaflet";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type PostCardProps = {
  post: Models.Document;
};

function MyPopupButton({ postId }: { postId: any }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${postId}`);
  };

  return (
    <button onClick={handleClick} className="untide-button_primary">
      View Event
    </button>
  );
}
const MapMarker = ({ post }: PostCardProps) => {
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
        <div className="popup-loc">
          {coords.name} <br />
        </div>
        <div className="popup-desc">
          Description: {post.caption} <br />
        </div>
        <div className="popup-button">
          <MyPopupButton postId={post.$id} />
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
