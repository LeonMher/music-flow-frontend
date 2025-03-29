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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">Music Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <div key={room.id} className="mb-4 border-1 p-4 rounded-2xl">
            <strong>{room.name}</strong> - {room.description}{" "}
            <RoomDetails key={room.id} room={room} />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setSelectedRoom(room.id)}
            >
              Select
            </button>
          </div>
        ))}
      </ul>

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
