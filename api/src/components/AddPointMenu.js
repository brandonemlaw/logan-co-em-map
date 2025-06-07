import React, { useState } from "react";
import { EMERGENCY_TYPES } from "../constants";

function AddPointMenu({ onClose, onAddPoint }) {
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("fire");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState(null);

  // Geocode location string to lat/lng using Nominatim
  async function geocode() {
    if (!location) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}, Logan County, Oklahoma`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data[0]) {
      setLat(data[0].lat);
      setLng(data[0].lon);
    } else {
      setError("Could not find location.");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!lat || !lng) {
      setError("Please enter a valid location and geocode.");
      return;
    }
    onAddPoint({
      title,
      location,
      type,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      created: Date.now(),
    });
  }

  return (
    <div className="glass-modal">
      <form onSubmit={handleSubmit}>
        <h2>Add Event</h2>
        <label>
          Location (address, intersection, or landmark):
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Main & Division"
            required
          />
          <button type="button" onClick={geocode} style={{marginTop:4}}>
            Auto-Geocode
          </button>
        </label>
        <label>
          GPS Latitude:
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="35.9"
            required
            type="number"
            step="any"
          />
        </label>
        <label>
          GPS Longitude:
          <input
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="-97.4"
            required
            type="number"
            step="any"
          />
        </label>
        <label>
          Title of Event:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Large tree blocking road"
            required
          />
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(EMERGENCY_TYPES).map(([key, { label }]) => (
              <option value={key} key={key}>{label}</option>
            ))}
          </select>
        </label>
        <div style={{ margin: "1em 0 0 0", display: "flex", gap: 8 }}>
          <button type="submit">Add Point</button>
          <button type="button" onClick={onClose} className="outline">Cancel</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default AddPointMenu;