import { CircleChevronUp } from "lucide-react";
import ScrollToTop from "react-scroll-to-top";
import BlogCard from "./BlogCard";
import { useParams } from "react-router-dom";
import NoPostsFound from "./NoPostsFound";
import LoadingScreen from "./LoadingScreen";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import NoDataFound from "./NoDataFound";

const UserBlogs = () => {
  const authorId = useParams();
  const { userPosts, loading, user } = useGetUserPosts(authorId.id);

  if (loading) return <LoadingScreen />;

  if (userPosts.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="flex items-center justify-between ml-4 mr-4">
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
        <h2 className="text-2xl font-bold tracking-tighter">{`${user.fullName}'s Blogs`}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {userPosts.length > 0 &&
          userPosts.map((data, index) => (
            <BlogCard
              key={index}
              postId={data._id}
              title={data.title}
              shortDescription={data.shortDescription}
              imageUrl={data.image}
              createdAt={data.createdAt}
              authorName={data.author.username}
              authorProPic={data.author.profilePic}
              authorUserId={data.author._id}
            />
          ))}
      </div>

      {userPosts.length == 0 && <NoPostsFound />}
    </div>
  );
};

export default UserBlogs;
