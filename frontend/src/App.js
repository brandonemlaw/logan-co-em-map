import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import AddPointMenu from "./components/AddPointMenu";
import "./App.css";

function App() {
  const [points, setPoints] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch points from API
  useEffect(() => {
    fetch("/api/points")
      .then((res) => res.json())
      .then(setPoints)
      .catch(() => setPoints([]));
  }, []);

  // Add new point to API and UI
  const addPoint = async (point) => {
    const res = await fetch("/api/points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(point),
    });
    if (res.ok) {
      const updated = await res.json();
      setPoints(updated);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      <Map points={points} />
      <button
        className="floating-action-btn"
        onClick={() => setIsMenuOpen(true)}
      >
        +
      </button>
      {isMenuOpen && (
        <AddPointMenu
          onClose={() => setIsMenuOpen(false)}
          onAddPoint={addPoint}
        />
      )}
    </div>
  );
}

export default App;
