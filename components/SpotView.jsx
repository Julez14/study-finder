import React, { useState, useContext } from "react";
import SpotsList from "./SpotsList";
import SpotInfo from "./SpotInfo";
import Map from "./Map";
import "./SpotView.css";

const SpotView = () => {
  const { spot } = useContext(SpotContext);
  console.log("Spot:", spot);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleSpotSelect = () => {
    console.log("Spot selected:", spot);
    setSelectedSpot(spot);
  };

  return (
    <div className="spots-container">
      <div className="spots-sidebar">
        <h1 className="spots-title">GeoStudy</h1>
        <SpotsList onSpotSelect={() => handleSpotSelect()} />
      </div>
      <div className="spots-map">
        <Map />
      </div>
      {selectedSpot && (
        <SpotInfo spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
      )}
    </div>
  );
};

export default SpotView;
