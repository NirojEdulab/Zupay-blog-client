import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import useFetchAllPosts from "@/hooks/useFetchAllPosts";
import { CircleChevronUp, Newspaper } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

const AllBlogs = () => {
  const { postData, loading } = useFetchAllPosts();
  const params = useLocation();

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
        <h2 className="text-2xl font-bold tracking-tighter">
          <span className="flex items-center gap-2">
            <Newspaper /> All Blogs
          </span>
        </h2>
        <Link
          to={"/posts/all"}
          className="text-lg block font-medium text-primary hover:text-primary/90"
        >
          {params.pathname !== "/posts/all" && (
            <Button>
              All Blogs <span>&rarr;</span>
            </Button>
          )}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {postData.map((data, index) => (
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
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-4">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
