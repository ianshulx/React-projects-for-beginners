import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onSearch(city); }}>
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city"/>
      <button type="submit">Search</button>
    </form>
  );
}
