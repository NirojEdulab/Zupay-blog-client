/* eslint-disable react/prop-types */
import { UserCog } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AuthContext } from "@/contexts/AuthContext";

const ProfileBanner = ({ user }) => {
  const { authUser } = useContext(AuthContext);
  const [coverImageLoading, setCoverImageLoading] = useState(true);
  const [profileImageLoading, setProfileImageLoading] = useState(true);

  if (!user) return;

  return (
    <div className="bg-secondary flex items-center justify-center m-4 rounded-sm p-4">
      <div className="bg-secondary shadow-lg transform duration-200 easy-in-out rounded-sm">
        <div className="max-h-64 overflow-hidden max-w-9xl">
          {coverImageLoading && (
            <div className="min-w-7xl h-64 bg-gray-200 animate-pulse rounded-md"></div>
          )}
          <img
            className={`max-w-7xl min-h-32 object-cover ${
              coverImageLoading ? "hidden" : ""
            }`}
            src={user && user?.coverImage}
            loading="lazy"
            alt={`${user.username} cover picture`}
            onLoad={() => setCoverImageLoading(false)}
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80`;
            }}
          />
        </div>
        <div className="flex justify-center px-5 -mt-12">
          {profileImageLoading && (
            <div className="h-32 w-32 bg-gray-200 animate-pulse rounded-full"></div>
          )}
          <img
            className={`h-32 w-32 bg-white p-2 rounded-full object-cover ${
              profileImageLoading ? "hidden" : ""
            }`}
            src={
              user && user.profilePic
                ? user.profilePic
                : `https://avatar.iran.liara.run/username?username=${user.username}`
            }
            loading="lazy"
            alt={`${user} profile picture`}
            onLoad={() => setProfileImageLoading(false)}
            onError={(e) => {
              e.target.src = `https://avatar.iran.liara.run/username?username=${user.username}`;
            }}
          />
        </div>
        <div>
          <div className="text-center px-14">
            <h2 className="text-primary text-3xl font-bold">{user.fullName}</h2>
            <p className="text-gray-400 mt-2">@{user.username}</p>
            <p className="mt-2 text-gray-500 text-sm">{user?.bio}</p>
            {authUser && authUser._id === user._id && (
              <span className="flex justify-center items-center">
                <Link to={`/profile/${authUser._id}/edit`}>
                  <Button variant="outline">
                    <UserCog className="mr-2" />
                    Edit
                  </Button>
                </Link>
              </span>
            )}
          </div>
          <hr className="mt-6" />
          <div className="flex  bg-secondary-50">
            <div className="text-center w-1/2 p-4 hover:bg-secondary-100 cursor-pointer">
              <p>
                <span className="font-semibold">{user.posts?.length}</span>{" "}
                Uploads
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-secondary-100 cursor-pointer">
              <p>
                {" "}
                <span className="font-semibold">{user.totalViews}</span> Views
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
