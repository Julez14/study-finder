import React, { useState } from "react";
import "./JoinSpot.css";

const JoinSpot = ({
  onClose,
  spotName,
  spotStatus,
  participants,
  onAddParticipant,
}) => {
  const [newName, setNewName] = useState("");

  const handleJoin = () => {
    if (newName.trim()) {
      onAddParticipant(newName.trim());
      setNewName("");
    }
  };

  return (
    <div className="join-spot-overlay">
      <div className="join-spot-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>Join this study session!</h2>
        <h3>{spotName}</h3>

        <div className="participants-list">
          <h4>Current Participants: ({participants.length}/12)</h4>
          {participants.map((name, index) => (
            <div key={index} className="participant-item">
              {name}
            </div>
          ))}
        </div>

        <div className="join-form">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleJoin}>Join Session</button>
        </div>
      </div>
    </div>
  );
};

export default JoinSpot;
