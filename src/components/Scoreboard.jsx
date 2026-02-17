export default function ScoreBoard({ teamA, teamB }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-6">
      <div className="bg-white shadow-lg rounded-xl px-10 py-6 text-4xl md:text-5xl font-bold text-blue-600 text-center">
        Team A: {teamA}
      </div>
      <div className="bg-white shadow-lg rounded-xl px-10 py-6 text-4xl md:text-5xl font-bold text-red-600 text-center">
        Team B: {teamB}
      </div>
    </div>
  );
}
