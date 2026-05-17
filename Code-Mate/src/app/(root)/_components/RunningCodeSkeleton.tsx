const RunningCodeSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 bg-gray-800/50 rounded w-3/4" />
      <div className="h-4 bg-gray-800/50 rounded w-1/2" />
      <div className="h-4 bg-gray-800/50 rounded w-5/6" />
    </div>

    <div className="space-y-2 pt-4">
      <div className="h-4 bg-gray-800/50 rounded w-2/3" />
      <div className="h-4 bg-gray-800/50 rounded w-4/5" />
      <div className="h-4 bg-gray-800/50 rounded w-3/4" />
    </div>
  </div>
);

export default RunningCodeSkeleton;
