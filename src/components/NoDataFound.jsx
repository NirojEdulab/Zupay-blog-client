const NoDataFound = () => {
  return (
    <div className="w-full mx-auto m-2 p-2 flex items-center flex-col justify-center h-full sm:h-[calc(100vh-180px)] bg-secondary">
      <img
        src={"/public/nodatafound.svg"}
        alt="No data found"
        width={"500px"}
        loading="lazy"
        className="object-cover rounded-md bg-opacity-100"
      />
      <h3 className="text-sm md:text-lg font-medium">No data found</h3>
    </div>
  );
};

export default NoDataFound;
