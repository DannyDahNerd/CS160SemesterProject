import { Marker, Popup } from "react-leaflet";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";

type PostCardProps = {
  post: Models.Document;
};

function MyPopupButton({ postId }: { postId: string }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(`/posts/${postId}`)} className="untide-button_primary">
      View Event
    </button>
  );
}

const MapMarker = ({ post }: PostCardProps) => {
  if (!post.latitude || !post.longitude) return null; // Don't render if missing coords

  return (
    <Marker position={[post.latitude, post.longitude]}>
      <Popup>
        <div className="popup-loc">{post.location}</div>
        <div className="popup-desc">
          <h1 className="font-bold">Description:</h1>
          {post.caption}
        </div>
        <div className="popup-button">
          <MyPopupButton postId={post.$id} />
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;