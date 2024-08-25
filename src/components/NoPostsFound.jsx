const NoPostsFound = () => {
  return (
    <div className="w-full mx-auto m-2 p-2 flex items-center justify-center h-[calc(100vh-180px)] bg-secondary">
      <img
        src="/public/nodatafound.svg"
        alt="No posts found"
        width={"500px"}
        className="object-cover rounded-md"
      />
      <h3>No Data FOund</h3>
    </div>
  );
};

export default NoPostsFound;
