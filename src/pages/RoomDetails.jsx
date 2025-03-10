import React, { useState } from "react";
import RoomCalendar from "./RoomCalendar";

const RoomDetails = ({ room }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <button onClick={() => setShowCalendar(!showCalendar)}>
        {showCalendar ? "Hide Calendar" : "Show Busy Dates"}
      </button>
      {showCalendar && <RoomCalendar roomId={room.id} />}
    </div>
  );
};

export default RoomDetails;
