// src/components/HistoricalEvents.jsx
import React, { useEffect, useState } from 'react';

const HistoricalEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      const month = today.getMonth() + 1; // Months are zero-based
      const day = today.getDate();

      try {
        const response = await fetch(
          `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`
        );
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to fetch historical events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Historical Events Today</h1>
      
      {loading ? (
        <p className="text-lg text-gray-600">Loading events...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.slice(0, 10).map((event, idx) => (
            <div
              key={idx}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-blue-700">{event.year}</h2>
              <p className="mt-4 text-gray-700">{event.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalEvents;
