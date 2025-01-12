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
      status: true,
      times: ["4:20 PM - 9:00 PM"],
    },
    {
      id: "2",
      name: "Come study with me!",
      status: true,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "3",
      name: "super cool study session",
      status: true,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "4",
      name: "help me stop doomscrolling",
      status: false,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "5",
      name: "Lets grind through assignments",
      status: false,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "6",
      name: "Help me practice my presentation!",
      status: false,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "7",
      name: "Work and yap",
      status: false,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "8",
      name: "Stop rotting in bed, come study",
      status: false,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "9",
      name: "VERY PRODUCTIVE!!!",
      status: false,
      times: ["4:20 PM - 10:00 PM"],
    },
    {
      id: "10",
      name: "A normal study session",
      status: false,
      times: ["4:20 PM - 10:00 PM"],
    },
  ];

  return (
    <div className="spots-list">
      {spots.map((spot) => (
        <div
          key={spot.id}
          className={`spot-item ${spot.status ? "available" : "unavailable"}`}
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
          spotStatus={selectedSpot.status}
        />
      )}
    </div>
  );
};

export default SpotsList;
