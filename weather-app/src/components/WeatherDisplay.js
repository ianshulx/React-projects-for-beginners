import React from 'react';

export default function WeatherDisplay({ weather }) {
  if (!weather) return null;
  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temp: {weather.current.temperature}°C</p>
      <p>Wind: {weather.current.wind_speed} m/s</p>
    </div>
  );
}
