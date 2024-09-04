import React, { useContext, useState, useEffect } from "react";
import songContext from "../context/SongContext";
import { Icon } from "../Icons";
import SongItem from "../components/SongItem";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const context = useContext(songContext);
  const {
    songs,
    setSongs,
    isplaying,
    setisplaying,
    currentSong,
    setCurrentSong,
    ct,
    setCt,
  } = context;

  const updateCurrent = () => {
    setCurrentSong(songs[songs.findIndex((el) => el.id == searchResults.id)]);
  };

  const handleSearch = () => {
    fetch("http://127.0.0.1:5000/api/search", {
      method: "POST",
      body: new URLSearchParams({ search_box: searchTerm }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  };

  const playSong = (artist, title, image, id) => {
    setCurrentSong({
      id: id,
      title: title,
      artist: artist,
      image: image,
      url: `http://127.0.0.1:5000/api/stream?artist=${artist}&song=${title}`,
    });
  };

  return (
    <div className="overflow-y-auto h-screen">
      <div className="mr-auto ml-4 relative mt-2">
        <label
          htmlFor="search_box"
          className="text-black w-12 h-10 flex items-center justify-center absolute top-0 left-0"
        >
          <Icon size={24} name="search" />
        </label>

        <input
          autoFocus={true}
          type="text"
          id="search_box"
          className="h-10 pl-12 outline-none text-black font-medium bg-white rounded-3xl text-sm placeholder-black/50 max-w-full w-[22.75rem]"
          placeholder="What do you want to listen to?"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          onClick={handleSearch}
          className="bg-primary hover:bg-opacity-50 text-white rounded py-1 px-2 ml-2"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-5 gap-x-6 gap-y-5">
        {searchResults.map((result, idx) => (
          <SongItem item={result} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
