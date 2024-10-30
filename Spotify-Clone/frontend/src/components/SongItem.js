import { Icon } from "../Icons";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import songContext from "../context/SongContext";
// import { songsdata } from "./BottomBar/audios";

function SongItem({ item }) {
  const context = useContext(songContext);
  const { songs, setCurrentSong } = context;

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
    <NavLink
      key={item.id}
      to="/"
      className={
        "bg-footer p-4 rounded-lg transition-all duration-200 ease-in hover:bg-active group"
      }
    >
      <div className="pt-[100%] relative mb-4 rounded-md">
        <img
          src={item.image}
          className={`absolute inset-0 object-cover w-full h-full `}
        />
        <button
          onClick={() => playSong(item.artist, item.title, item.image, item.id)}
          className={`w-11 h-11 transition-play duration-200 ease-in rounded-full text-black bg-primary opacity-0 absolute flex bottom-0 right-2 items-center justify-center group-hover:opacity-100 group-hover:bottom-2 hover:scale-105 hover:bg-highlight`}
        >
          <Icon size={20} name="play" isBlack={true} />
        </button>
      </div>

      <h6 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold">
        {item.title}
      </h6>
    </NavLink>
  );
}

export default SongItem;
