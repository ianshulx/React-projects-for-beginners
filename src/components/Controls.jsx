export default function Controls({ setTeamA, setTeamB }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
        onClick={() => setTeamA(prev => prev + 1)}
      >
        + Team A
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
        onClick={() => setTeamB(prev => prev + 1)}
      >
        + Team B
      </button>
      <button
        className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
        onClick={() => { setTeamA(0); setTeamB(0); }}
      >
        Reset All
      </button>
    </div>
  );
}