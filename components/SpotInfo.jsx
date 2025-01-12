import React, { useState, useContext } from "react";

const SpotInfo = ({ spot, onClose }) => {
  const [userName, setUserName] = useState("");
  const [participants, setParticipants] = useState([]);

  const handleJoin = () => {
    if (userName.trim()) {
      setParticipants([...participants, userName]);
      setUserName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg w-[400px] text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{spot.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">Times: {spot.times}</p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>

        <button
          onClick={handleJoin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
        >
          Join Session
        </button>

        {participants.length > 0 && (
          <div>
            <p className="text-gray-400 text-sm mb-2">Participants:</p>
            <div className="bg-zinc-800 rounded p-2">
              {participants.map((name, index) => (
                <div key={index} className="text-sm">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotInfo;
