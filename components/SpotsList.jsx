import React from "react";
import "./SpotsList.css";

const SpotsList = () => {
  const spots = [
    {
      id: "cph",
      name: "CPH - Carl A. Pollock Hall",
      status: "available",
    },
    {
      id: "e2-1732",
      name: "E2 1732",
      status: "unavailable",
      times: ["4:20 PM - 10:00 PM"],
    },
    // Add more spots as needed
  ];

  return (
    <div className="spots-list">
      {spots.map((spot) => (
        <div key={spot.id} className={`spot-item ${spot.status}`}>
          <div className="spot-name">{spot.name}</div>
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
        </div>
      ))}
    </div>
  );
};

export default SpotsList;
