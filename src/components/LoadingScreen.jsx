const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-50px)]">
      <div className="relative w-12 h-12 border-4 border-transparent border-r-blue-600 rounded-full animate-spin">
        <div className="absolute inset-0 m-1.5 border-4 border-transparent border-r-blue-600 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 m-3 border-4 border-transparent border-r-blue-600 rounded-full animate-spin-slower"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
