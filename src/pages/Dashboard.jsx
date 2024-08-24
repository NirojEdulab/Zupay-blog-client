import BlogCard from "@/components/BlogCard";
import LoadingScreen from "@/components/LoadingScreen";
import NoDataFound from "@/components/NoDataFound";
import { AuthContext } from "@/contexts/AuthContext";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { CircleChevronUp } from "lucide-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";

const Dashboard = () => {
  const { authUser } = useContext(AuthContext);
  const { userPosts, loading, error } = useGetUserPosts(authUser._id);

  if (loading) return <LoadingScreen />;
  if (error) return toast.error("Opps! Something went wrong...");

  if (userPosts.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="m-4">
      <div className="flex items-center justify-between m-4">
        <ScrollToTop
          className="!bg-secondary"
          smooth
          width="36"
          height="36"
          component={
            <span className="flex items-center justify-center">
              <CircleChevronUp className="text-primary" />
            </span>
          }
        />
        <h2 className="text-2xl font-bold tracking-tighter">All Blogs</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {userPosts.map((data, index) => (
          <BlogCard
            key={index}
            postId={data._id}
            title={data.title}
            shortDescription={data.shortDescription}
            content={data.content}
            imageUrl={data.image}
            createdAt={data.createdAt}
            authorName={data.author.username}
            authorProPic={data.author.profilePic}
            authorUserId={data.author._id}
            views={data.views}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
