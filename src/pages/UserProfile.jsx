import LoadingScreen from "@/components/LoadingScreen";
import ProfileBanner from "@/components/ProfileBanner";
import { Button } from "@/components/ui/button";
import UserBlogs from "@/components/UserBlogs";
import { AuthContext } from "@/contexts/AuthContext";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

const UserProfile = () => {
  const { id: authorId } = useParams();
  const { userPosts, user } = useGetUserPosts(authorId);
  const { authUser } = useContext(AuthContext);

  return (
    <div className="w-full mx-auto border border-2-secondary rounded-md p-2">
      {authUser && (
        <div>
          <ProfileBanner user={user} />
          <UserBlogs userPost={userPosts} user={user} />
        </div>
      )}
      {!authUser && (
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h3 className="text-lg font-medium mt-3">Please login to view</h3>
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
