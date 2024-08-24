import { UserCog } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/Constants";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { AuthContext } from "@/contexts/AuthContext";

const ProfileBanner = () => {
  const { id: authorId } = useParams();
  const [userProfileData, setUserProfileData] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (!authorId) return;

    const getUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/user/${authorId}`);
        if (response.data.status === 200) {
          setUserProfileData(response.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log("error: ", error.response.data);
        return;
      }
    };

    getUserData();
  }, [authorId]);

  if (userProfileData.length === 0) {
    return;
  }

  return (
    <div className="bg-secondary flex items-center justify-center m-4 rounded-sm p-4">
      <div className="bg-secondary shadow-lg transform duration-200 easy-in-out rounded-sm">
        <div className="max-h-64 overflow-hidden">
          <img
            className="w-full min-h-32 object-cover"
            src={
              userProfileData && userProfileData?.coverImage
                ? userProfileData?.coverImage
                : `https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80`
            }
            loading="lazy"
            alt={`${userProfileData.username} cover picture`}
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80`;
            }}
          />
        </div>
        <div className="flex justify-center px-5 -mt-12">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full   "
            src={
              userProfileData && userProfileData.profilePic
                ? userProfileData.profilePic
                : `https://avatar.iran.liara.run/username?username=${userProfileData.username}`
            }
            loading="lazy"
            alt={`${userProfileData} profile picture`}
            onError={(e) => {
              e.target.src = `https://avatar.iran.liara.run/username?username=${userProfileData.username}`;
            }}
          />
        </div>
        <div>
          <div className="text-center px-14">
            <h2 className="text-primary text-3xl font-bold">
              {userProfileData.fullName}
            </h2>
            <p className="text-gray-400 mt-2">@{userProfileData.username}</p>
            <p className="mt-2 text-gray-500 text-sm">{userProfileData?.bio}</p>
            {authUser && authUser._id === userProfileData._id && (
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
                <span className="font-semibold">
                  {userProfileData.posts.length}
                </span>{" "}
                Uploads
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-secondary-100 cursor-pointer">
              <p>
                {" "}
                <span className="font-semibold">{"358"}</span> Views
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
