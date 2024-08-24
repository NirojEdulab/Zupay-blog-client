import LoadingScreen from "@/components/LoadingScreen";
import NoDataFound from "@/components/NoDataFound";
import ProfileBanner from "@/components/ProfileBanner";
import UserBlogs from "@/components/UserBlogs";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id: authorId } = useParams();
  const { userPosts, loading, user } = useGetUserPosts(authorId);

  if (loading) return <LoadingScreen />;

  if (!loading && userPosts.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="w-full mx-auto border border-2-secondary rounded-md p-2">
      <ProfileBanner user={user} />
      <UserBlogs userPost={userPosts} user={user} />
    </div>
  );
};

export default UserProfile;
