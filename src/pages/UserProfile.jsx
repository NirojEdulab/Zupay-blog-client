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
  const { userPosts, user, loading } = useGetUserPosts(authorId);
  const { authUser } = useContext(AuthContext);

  if (loading) {
    return;
  }

  return (
    <div className="max-w-7xl mx-auto border-2 rounded-md p-2 mt-4">
      {authUser && (
        <div>
          <ProfileBanner user={user} />
          <UserBlogs userPost={userPosts} user={user} />
        </div>
      )}
      {!authUser && (
        <div className="max-w-7xl flex flex-col justify-center items-center gap-2 p-4 min-h-[calc(100vh-200px)]">
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
