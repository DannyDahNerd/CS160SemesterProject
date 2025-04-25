import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
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
        <Marker position={[36.9645, -122.0167]}>
          //36.6134933long: -121.8979357
          <Popup>
            Santa Cruz Beach Boardwalk. <br /> CLEAN ME!!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
