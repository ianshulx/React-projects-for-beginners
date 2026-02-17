import { useState } from "react";
import ScoreBoard from "./components/Scoreboard";
import Controls from "./components/Controls";

function App() {
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);

  const getWinner = () => {
    if (teamA > teamB) return "Team A Wins! 🏆";
    if (teamB > teamA) return "Team B Wins! 🏆";
    return "It's a Tie! ⚖️";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4">
      
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-10 tracking-wide">
        🎮 ScoreMaster
      </h1>

      {/* Scoreboard */}
      <ScoreBoard teamA={teamA} teamB={teamB} />

      {/* Controls */}
      <Controls setTeamA={setTeamA} setTeamB={setTeamB} />

      {/* Winner Display */}
      <p className="mt-6 text-2xl md:text-3xl font-semibold text-gray-700">
        {getWinner()}
      </p>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm md:text-base">
        Built with React & Tailwind CSS | Showcasing React skills, responsive
        design, UI styling, and creativity by Zawiee 
      </footer>
    </div>
  );
}

export default App;