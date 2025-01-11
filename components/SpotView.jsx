import React from "react";
import SpotsList from "./SpotsList";
import Map from "./Map";
import "./SpotView.css";

const SpotView = () => {
  return (
    <div className="spots-container">
      <div className="spots-sidebar">
        <h1 className="spots-title">spots</h1>
        <SpotsList />
      </div>
      <div className="spots-map">
        <Map />
      </div>
    </div>
  );
};

export default SpotView;
