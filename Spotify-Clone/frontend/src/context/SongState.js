import React from "react";
import songContext from "./SongContext";
import { songsdata } from "../components/BottomBar/audios";
import { useRef, useState, useEffect } from "react";

function SongState(props) {
  const [songs, setSongs] = useState(songsdata);
  // const history = useRef();
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const [ct, setCt] = useState(0);
  const audioElem = useRef();

  useEffect(() => {
    const songsHistory = JSON.parse(localStorage.getItem("songsHistory"));
    console.log("From local Storage");
    console.log(songsHistory);
    if (songsHistory) {
      setSongs(songsHistory);
    } else {
      setSongs(songsdata);
    }
  }, []);

  useEffect(() => {
    if (currentSong) {
      const index = songs.findIndex((x) => x.id === currentSong.id);
      if (index === -1 && songs.length < 5) {
        setSongs((prevSongs) => [...prevSongs, currentSong]);
      } else if (index === -1) {
        setSongs((prevSongs) => [...prevSongs.slice(1), currentSong]);
      } else {
        console.log(index);
        setSongs((prevSongs) => [
          ...prevSongs.slice(0, index),
          ...prevSongs.slice(index + 1),
          currentSong,
        ]);
      }
    }
  }, [currentSong?.id]);

  useEffect(() => {
    console.log(songs);
    localStorage.setItem("songsHistory", JSON.stringify(songs));
  }, [JSON.stringify(songs)]);

  return (
    <songContext.Provider
      value={{
        songs,
        setSongs,
        isplaying,
        setisplaying,
        currentSong,
        setCurrentSong,
        ct,
        setCt,
        audioElem,
      }}
    >
      {props.children}
    </songContext.Provider>
  );
}

export default SongState;
