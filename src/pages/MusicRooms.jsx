import { useState, useEffect } from "react";
import RoomDetails from "./RoomDetails";
import axios from "axios";

const API_BASE_URL = "https://localhost:7125/api";

const MusicRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch music rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/MusicRooms`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching music rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  // Handle booking submission
  const handleBooking = async () => {
    if (!selectedRoom || !startTime || !endTime) {
      setMessage("Please select a room and time range.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // Get stored token
      if (!token) {
        setMessage("You must be logged in to book a room.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/bookings`,
        {
          musicRoomId: selectedRoom,
          startTime,
          endTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`Booking confirmed: ${response.data.musicRoomName}`);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage(error.response?.data || "Failed to book the room. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Music Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong> - {room.description}{" "}
            <RoomDetails key={room.id} room={room} />
            <button onClick={() => setSelectedRoom(room.id)}>Select</button>
          </li>
        ))}
      </ul>
      {/* {rooms.map((room) => (
//         <RoomDetails key={room.id} room={room} />
//       ))} */}

      {selectedRoom && (
        <div>
          <h3>Book Room ID: {selectedRoom}</h3>
          <label>
            Start Time:
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            End Time:
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
          <button onClick={handleBooking} disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default MusicRooms;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import RoomDetails from "./RoomDetails";

// const RoomList = () => {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     // Fetch all music rooms from the API
//     axios.get("https://localhost:7125/api/musicrooms")
//       .then((response) => {
//         setRooms(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching rooms:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Music Rooms</h2>
//       {rooms.map((room) => (
//         <RoomDetails key={room.id} room={room} />
//       ))}
//     </div>
//   );
// };

// export default RoomList;
