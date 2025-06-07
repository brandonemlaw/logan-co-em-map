import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { EMERGENCY_TYPES } from "../constants";
import "leaflet/dist/leaflet.css";

// Logan County, OK
const LOGAN_COUNTY_CENTER = [35.878, -97.424];
const LOGAN_COUNTY_BOUNDS = [
  [35.5825, -97.6562], // SW
  [36.1631, -97.0571], // NE
];

function getIcon(type) {
  const { icon, color } = EMERGENCY_TYPES[type] || EMERGENCY_TYPES["fire"];
  return new L.DivIcon({
    html: `<div style="background:${color};border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.2);font-size:18px;">${icon}</div>`,
    className: "",
    iconSize: [32, 32],
  });
}

const Map = ({ points }) => (
  <MapContainer
    center={LOGAN_COUNTY_CENTER}
    zoom={11}
    minZoom={10}
    maxBounds={LOGAN_COUNTY_BOUNDS}
    style={{ height: "100vh", width: "100vw", zIndex: 1 }}
    maxBoundsViscosity={1.0}
  >
    <TileLayer
      url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
    />
    {points.map((pt, i) => (
      <Marker
        key={i}
        position={[pt.lat, pt.lng]}
        icon={getIcon(pt.type)}
      >
        <Popup>
          <strong>{pt.title}</strong>
          <br />
          <span>{pt.location}</span>
          <br />
          <span>Type: {EMERGENCY_TYPES[pt.type]?.label || pt.type}</span>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default Map;
