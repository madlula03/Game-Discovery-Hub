function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-700" />
      <div className="p-4">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-700 rounded w-2/3 mb-4" />
        <div className="h-4 bg-gray-700 rounded w-1/4" />
      </div>
    </div>
  );
}

export default SkeletonCard;