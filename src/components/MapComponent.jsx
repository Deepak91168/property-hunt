import React from "react";
import { Marker, MapContainer, TileLayer, Popup } from "react-leaflet";
export const MapComponent = (props) => {
  return (
    <MapContainer
      center={[props.position.lat, props.position.lng]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.position.lat, props.position.lng]}>
        <Popup className="text-center">
          ({props.position.lat},{props.position.lng})
        </Popup>
      </Marker>
    </MapContainer>
  );
};
