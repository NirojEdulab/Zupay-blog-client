const NoDataFound = () => {
  return (
    <div className="w-full mx-auto m-2 p-2 flex items-center justify-center h-[calc(100vh-180px)] bg-secondary">
      <img
        src="/src/assets/NoData.jpg"
        alt="No posts found"
        width={"500px"}
        className="object-cover rounded-md bg-opacity-100"
      />
    </div>
  );
};

export default NoDataFound;
