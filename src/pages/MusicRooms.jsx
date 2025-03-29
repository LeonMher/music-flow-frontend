import { useState, useEffect } from "react";
import RoomDetails from "./RoomDetails";
import axios from "axios";
import SomeImage from "../assets/playing_bro_solo.svg";

// If your React app is served from the same domain as your API
const API_BASE_URL = "https://localhost:7125";
// If using Create React App with proxy in package.json, you might just use:
// const API_BASE_URL = "";

const MusicRooms = () => {
  const [rooms, setRooms] = useState({ items: [] }); // Initialize with empty items array
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/MusicRooms?page=1&pageSize=10`
        );
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
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to book a room.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/bookings`,
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

      <div className="w-full max-w-4xl">
        {rooms.items?.map((room) => (
          <div
            key={room.id}
            className="mb-8 p-6 rounded-xl shadow-lg bg-white flex flex-col md:flex-row gap-6"
          >
            <div className="flex-1">
              {/* Image display - using the direct URL from the API response */}
              <img
                src={`${API_BASE_URL}${room.imageUrl}`}
                alt={room.name}
                className="w-full h-48 md:h-64 object-cover rounded-lg"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
              <p className="text-gray-600 mb-4">{room.description}</p>

              <RoomDetails room={room} />

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                onClick={() => setSelectedRoom(room.id)}
              >
                Select Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">
            Book Room ID: {selectedRoom}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time:
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time:
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleBooking}
              disabled={loading}
              className={`w-full py-2 px-4 rounded font-bold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      )}

      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            message.includes("confirmed")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default MusicRooms;
