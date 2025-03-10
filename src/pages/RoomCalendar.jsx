import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const RoomCalendar = ({ roomId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch busy dates for the specified music room
    const fetchBusyDates = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7125/api/musicrooms/${roomId}/busydates`
        );
        const busyDates = response.data.map((booking) => ({
          title: "Booked",
          start: new Date(booking.startTime),
          end: new Date(booking.endTime),
        }));
        setEvents(busyDates);
      } catch (error) {
        console.error("Error fetching busy dates:", error);
      }
    };

    fetchBusyDates();
  }, [roomId]);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week", "day"]}
      />
    </div>
  );
};

export default RoomCalendar;
