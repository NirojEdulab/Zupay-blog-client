import { Link } from "react-router-dom";

const MobileSidebarLinks = ({ pathRef, pathName, icon, isLast }) => {
  return (
    <Link
      to={pathRef}
      className={`border border-2-secondary rounded-md mt-2 w-full ${
        isLast ? "mb-2" : ""
      }`}
    >
      <div className="flex justify-center items-center gap-2 hover:bg-secondary rounded-md group p-3">
        <span className="text-3xl text-primary">{icon}</span>
        <h3 className="text-lg text-primary font-semibold">{pathName}</h3>
      </div>
    </Link>
  );
};

export default MobileSidebarLinks;
