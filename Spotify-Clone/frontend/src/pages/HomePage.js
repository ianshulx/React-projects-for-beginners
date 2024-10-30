import React, { useEffect, useState, useContext } from "react";
import songContext from "../context/SongContext";
import Section from "../components/Section";

function HomePage() {
  const context = useContext(songContext);
  const { songs, setSongs, currentSong } = context;
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  useEffect(() => {
    // TODO: Change to get recommendations instead of search from browser history
    if (currentSong) {
      fetch(`/api/recommend/${currentSong.id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendedSongs(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [currentSong?.id]);

  return (
    <div className="overflow-y-auto h-100 p-4">
      <div className="grid gap-y-8">
        <Section
          title="Recently played"
          more="/blabla"
          items={songs}
          reverse={true}
        />
        {/* <Section title="Shows to try" more="/blabla" items={songs} /> */}
        <Section
          title="Made For You"
          more="/blabla"
          items={recommendedSongs && recommendedSongs.slice(0, 7)}
        />
      </div>
    </div>
  );
}

export default HomePage;
