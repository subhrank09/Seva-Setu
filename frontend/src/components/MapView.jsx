import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "../utils/fixLeafletIcon";

function LocationMarker({ setCoordinates }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);
      setCoordinates(lat, lng); // 🔥 send to parent
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapView({ setCoordinates }) {
  return (
    <MapContainer
      center={[22.8046, 86.2029]}
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationMarker setCoordinates={setCoordinates} />
    </MapContainer>
  );
}