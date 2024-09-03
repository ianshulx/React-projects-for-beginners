import React, { useRef, useContext, useEffect, useState } from "react";
import { useAudio, useFullscreen, useToggle } from "react-use";
import { Icon } from "../../Icons";
import songContext from "../../context/SongContext";
import CustomRange from "./CustomRange";
import FullScreenPlayer from "../../pages/FullScreenPlayer";
import { useVoiceModulation } from "@specular-aura/voice-modulation";
const Player = ({ audioElem }) => {
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

  const fsRef = useRef();
  const clickRef = useRef();
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(fsRef, show, {
    onClose: () => toggle(false),
  });

  const currentTime = audioElem.current ? audioElem.current.currentTime : 0;
  const duration = audioElem.current ? audioElem.current.duration : 0;

  const PlayPause = () => {
    if (currentSong) {
      setisplaying(!isplaying);
    } else {
      setisplaying(false);
    }
  };

  const [progress, setProgress] = useState(0);
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

  // const changeVoice = async () => {
  //   console.log(currentSong.url);
  //   if (currentSong) {
  //     const arrayBuffer = await (await fetch(currentSong?.url)).arrayBuffer();
  //     let ctx = new AudioContext();
  //     const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  //     let outputAudioBuffer = await megaphoneTransform(audioBuffer);
  //     let outputWavBlob = await audioBufferToWaveBlob(outputAudioBuffer);
  //     let audioUrl = window.URL.createObjectURL(outputWavBlob);
  //     console.log(currentSong.url);
  //     setCurrentSong({
  //       id: Math.floor(Math.random() * 100),
  //       title: `${currentSong.title} Modified`,
  //       description: "Original Soundtrack",
  //       artist: currentSong.artist,
  //       image: currentSong.image,
  //       type: currentSong.type,
  //       url: audioUrl,
  //     });
  //   }
  // };

  const changeVoice = useVoiceModulation(
    currentSong,
    setCurrentSong,
    "megaphone"
  );

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const updateProgress = () => {
    const newProgress = (audioElem.current.currentTime / duration) * 100;
    setProgress(newProgress);
    setCt(audioElem.current.currentTime);
  };

  const handleTimeUpdate = () => {
    requestAnimationFrame(updateProgress);
  };
  useEffect(() => {
    audioElem.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElem.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioElem, duration]);

  useEffect(() => {
    // Set the initial progress value to 0 when the component mounts
    setProgress(0);
  }, []);
  return (
    <>
      <div className="flex px-4 justify-between items-center h-full">
        <div className="min-w-[11.25rem] w-[30%]">
          {currentSong && (
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <div className="w-14 h-14 mr-3 relative group flex-shrink-0">
                  <img src={currentSong.image} alt="" />
                  <button
                    // onClick={() => dispatch(setSidebar(true))}
                    className="w-6 h-6 bg-black opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:scale-[1.06] rotate-90 rounded-full absolute top-1 right-1 flex items-center justify-center"
                  >
                    <Icon size={16} name="arrowLeft" />
                  </button>
                </div>

                <div>
                  <h6 className="text-sm line-clamp-1">{currentSong.title}</h6>
                  <p className="text-[0.688rem] text-white text-opacity-70">
                    {currentSong.artist}
                  </p>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                <Icon size={16} name="heart" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                <Icon size={16} name="pictureInPicture" />
              </button>
            </div>
          )}
        </div>

        <div className="max-w-[45.125rem] w-[40%] pt-2 flex flex-col px-4 items-center">
          <div className="flex items-center gap-x-2">
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

          <div className="w-full flex items-center mt-1.5 gap-x-2">
            <div className="text-[0.688rem] text-white text-opacity-70">
              {formatTime(currentTime)}
            </div>

            <CustomRange
              value={progress}
              onChange={(value) => {
                const newTime = (value / 100) * audioElem.current.duration;
                setCt(newTime);
                audioElem.current.currentTime = newTime;
              }}
              onClick={() => {
                audioElem.current.pause();
              }}
              onDragStart={() => {
                audioElem.current.pause();
              }}
              onDragEnd={() => {
                if (isplaying) {
                  audioElem.current.play();
                }
              }}
            />

            <div className="text-[0.688rem] text-white text-opacity-70">
              {formatTime(duration)}
            </div>
          </div>
        </div>
        <div className="min-w-[11.25rem] w-[30%] flex items-center justify-end">
          <button
            onClick={changeVoice}
            className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
          >
            <Icon size={16} name="plus" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Icon size={16} name="lyrics" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Icon size={16} name="queue" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Icon size={16} name="device" />
          </button>

          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
          >
            <Icon size={16} name="fullScreen" />
          </button>
        </div>
        <div ref={fsRef}>
          {isFullscreen && (
            <FullScreenPlayer
              toggle={toggle}
              // state={state}
              // controls={controls}
              // volumeIcon={volumeIcon}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Player;

//Accha hai(using Animation)
