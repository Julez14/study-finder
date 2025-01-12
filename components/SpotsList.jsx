import React, { useContext, createContext, useState } from "react";
import "./SpotsList.css";
import JoinSpot from "./JoinSpot";

const SpotsList = ({ onSpotSelect }) => {
  const SpotContext = createContext();
  const [selectedSpot, setSelectedSpot] = useState(null);

  const spots = [
    {
      id: "1",
      name: "Epic Study Session",
      status: "available",
      times: ["4:20 PM - 9:00 PM"],
    },
    {
      id: "2",
      name: "Come study with me!",
      status: "unavailable",
      times: ["4:20 PM - 10:00 PM"],
    },
  ];

  return (
    <div className="spots-list">
      {spots.map((spot) => (
        <div
          key={spot.id}
          className={`spot-item ${spot.status}`}
          onClick={() => setSelectedSpot(spot)}
        >
          <SpotContext.Provider value={{ spot }}>
            <div className="spot-name">
              <h3 className="spot-name-text">{spot.name}</h3>
            </div>
            {spot.times && (
              <div className="spot-times">
                {spot.times.map((time, index) => (
                  <div key={index} className="time-slot">
                    {time}
                  </div>
                ))}
              </div>
            )}
            <div className="status-indicator"></div>
          </SpotContext.Provider>
        </div>
      ))}

      {selectedSpot && (
        <JoinSpot
          spotName={selectedSpot.name}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </div>
  );
};

export default SpotsList;
