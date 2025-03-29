import React, { useState } from "react";
import RoomCalendar from "./RoomCalendar";

const RoomDetails = ({ room }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {showCalendar ? "Hide Calendar" : "Show Busy Dates"}
      </button>
      {showCalendar && <RoomCalendar roomId={room.id} />}
    </div>
  );
};

export default RoomDetails;
