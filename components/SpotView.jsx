// DEPRECIATED

import React, { useState, useContext } from "react";
import SpotsList from "./SpotsList";
import SpotInfo from "./SpotInfo";
import Map from "./Map";
import "./SpotView.css";

const buildings = [
  {
    id: 1,
    name: "Peter George",
    status: true,
    location: [-79.918108, 43.265512],
  },
  {
    id: 2,
    name: "McLennan Physical Laboratories",
    status: false,
    location: [-79.917162, 43.265028],
  },
  {
    id: 3,
    name: "Degrotte School of business",
    status: false,
    location: [-79.916477, 43.263917],
  },
  {
    id: 4,
    name: "Health Science Library",
    status: false,
    location: [-79.918441, 43.260086],
  },
  {
    id: 5,
    name: "Psychology Building",
    status: true,
    location: [-79.919771, 43.259711],
  },
  {
    id: 6,
    name: "Information Technology Building ",
    status: false,
    location: [-79.920956, 43.258867],
  },
  {
    id: 7,
    name: "Burke Science Building",
    status: true,
    location: [-79.920166, 43.262054],
  },
  {
    id: 8,
    name: "Nuclear Reactor",
    status: false,
    location: [-79.921454, 43.261173],
  },
  {
    id: 9,
    name: "E.T. Clarke Centre",
    status: false,
    location: [-79.922085, 43.261771],
  },
  {
    id: 10,
    name: "Mcmaster divinity college",
    status: false,
    location: [-79.91799, 43.26186],
  },
];

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
        <h1 className="spots-title">StudyCrawl</h1>
        <SpotsList onSpotSelect={() => handleSpotSelect()} />
      </div>
      <div className="spots-map">
        <Map buildings={buildings} />
      </div>
      {selectedSpot && (
        <SpotInfo spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
      )}
    </div>
  );
};

export default SpotView;
