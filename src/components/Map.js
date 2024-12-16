import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, lon }) => {
  return (
    <div style={{ height: "400px", marginTop: "20px" }}>
      <MapContainer center={[lat, lon]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lon]}>
          <Popup>
            You are here! <br /> Latitude: {lat}, Longitude: {lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
