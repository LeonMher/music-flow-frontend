import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings for the current user
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://localhost:7125/api/bookings/mybookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchMyBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7125/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Booking canceled successfully!");
      // Refresh the bookings list
      const response = await axios.get(
        "https://localhost:7125/api/bookings/mybookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>{booking.musicRoomName}</strong>: {booking.startTime} to{" "}
            {booking.endTime}
            <button onClick={() => handleCancelBooking(booking.id)}>
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
