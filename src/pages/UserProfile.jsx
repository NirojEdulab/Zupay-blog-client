import LoadingScreen from "@/components/LoadingScreen";
import NoDataFound from "@/components/NoDataFound";
import ProfileBanner from "@/components/ProfileBanner";
import { Button } from "@/components/ui/button";
import UserBlogs from "@/components/UserBlogs";
import { AuthContext } from "@/contexts/AuthContext";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

const UserProfile = () => {
  const { id: authorId } = useParams();
  const { userPosts, loading, user } = useGetUserPosts(authorId);
  const { authUser } = useContext(AuthContext);

  if (loading) return <LoadingScreen />;

  if (!loading && userPosts.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="w-full mx-auto border border-2-secondary rounded-md p-2">
      <ProfileBanner user={user} />
      {authUser && <UserBlogs userPost={userPosts} user={user} />}
      {!authUser && (
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h3 className="text-lg font-medium mt-3">
            Please login to view posts
          </h3>
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
