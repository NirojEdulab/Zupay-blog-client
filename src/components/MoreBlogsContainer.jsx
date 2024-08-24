import { Link, useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { Button } from "./ui/button";
import _ from "lodash";
import useFetchAllPosts from "@/hooks/useFetchAllPosts";
import LoadingScreen from "./LoadingScreen";

const MoreBlogsContainer = ({ heading }) => {
  const currentPostId = useParams();
  let { postData, loading } = useFetchAllPosts();

  const otherPosts = postData.filter((post) => post._id !== currentPostId.id);
  const moreBlogPosts = _.sampleSize(otherPosts, 3);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      {moreBlogPosts.length > 0 && (
        <>
          <div className="md:flex md:items-center md:justify-between ml-4 mr-4">
            <h2 className="text-2xl font-bold tracking-tighter">{heading}</h2>
            <Link
              to={"/posts/all"}
              className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
            >
              All Blogs <span>&rarr;</span>
            </Link>
          </div>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10"
            onClick={goToTop}
          >
            {moreBlogPosts.map((post, index) => (
              <BlogCard
                key={index}
                postId={post._id}
                title={post.title}
                shortDescription={post.shortDescription}
                imageUrl={post.image}
                createdAt={post.createdAt}
                authorName={post.author.username}
                authorProPic={post.author.profilePic}
                authorUserId={post.author._id}
              />
            ))}
          </div>

          <Link
            to={"/posts/all"}
            className="flex justify-center mt-8 text-sm font-medium text-primary hover:text-primary/90 md:hidden"
          >
            <Button>See More</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default MoreBlogsContainer;
