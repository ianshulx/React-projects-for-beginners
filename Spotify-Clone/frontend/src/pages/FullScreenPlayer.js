import React, { useRef, useContext } from "react";
import { useAudio, useFullscreen, useToggle } from "react-use";
import { Icon } from "../Icons";
import songContext from "../context/SongContext";
import CustomRange from "../components/BottomBar/CustomRange";

function FullScreenPlayer({ toggle }) {
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
    audioElem,
  } = context;

  const fsRef = useRef();
  const clickRef = useRef();

  const currentTime = audioElem.current ? audioElem.current.currentTime : 0;
  const duration = audioElem.current ? audioElem.current.duration : 0;

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    if (clickRef.current) {
      let width = clickRef.current.clientWidth;
      const offset = e.nativeEvent.offsetX;
      const divprogress = (offset / width) * 100;
      const newTime = (divprogress / 100) * audioElem.current.duration; // Use audioElem.current.duration
      audioElem.current.currentTime = newTime;
      setCt(newTime);
    }
  };
  const progress = (ct / currentSong.length) * 100;

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    setCt(0);
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    setCt(0);
  };

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
      <div className="h-full relative">
        <div
          className="absolute inset-0 object-cover bg-center bg-cover blur-md opacity-30"
          style={{ backgroundImage: `url(${currentSong.image})` }}
        />

        <div className="absolute opacity-70 top-8 left-8 gap-x-4 text-white flex items-center">
          <Icon size={34} name="logo" />
          <div className="text-xs">
            <p style={{ fontSize: 11 }}>PLAYING FROM PLAYLIST</p>
            <h6 className="font-semibold mt-0.5">{currentSong.title}</h6>
          </div>
        </div>

        <div className="absolute left-8 bottom-36 flex items-center gap-x-5">
          <img
            src={currentSong.image}
            alt=""
            className="w-24 h-24 object-cover"
          />
          <div className="self-end">
            <h3 className="text-3xl font-bold">{currentSong.title}</h3>
            <p className="text-sm font-medium opacity-50">
              {currentSong.description}
            </p>
          </div>
        </div>

        <div className="w-full absolute bottom-4 flex flex-col px-8 items-center">
          <div className="w-full flex items-center mb-1.5 gap-x-2">
            <div className="text-[0.688rem] text-white text-opacity-70">
              {formatTime(currentTime)}
            </div>

            <CustomRange
              value={progress}
              onChange={(value) => {
                const newTime = (value / 100) * audioElem.current.duration;
                setCt(newTime);
              }}
              onClick={checkWidth}
            />

            <div className="text-[0.688rem] text-white text-opacity-70">
              {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center">
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="shuffle" />
            </button>

            <button
              onClick={skipBack}
              className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
            >
              <Icon size={16} name="playerPrev" />
            </button>
            <button
              onClick={PlayPause}
              className="w-8 h-8 bg-white flex items-center justify-center text-black rounded-full hover:scale-[1.06]"
            >
              {isplaying ? (
                <Icon size={16} name="pause" />
              ) : (
                <Icon size={16} name="play" />
              )}
            </button>

            <button
              onClick={skiptoNext}
              className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
            >
              <Icon size={16} name="playerNext" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Icon size={16} name="repeat" />
            </button>
          </div>

          <div className="flex items-center absolute bottom-3 right-6 gap-x-3">
            <button
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
            >
              <Icon size={24} name="fullScreenOff" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullScreenPlayer;
