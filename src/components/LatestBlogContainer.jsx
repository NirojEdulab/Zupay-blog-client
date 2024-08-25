import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { Button } from "./ui/button";
import ScrollToTop from "react-scroll-to-top";
import { CircleChevronUp } from "lucide-react";

const LatestBlogContainer = ({ postData = [], heading, icon }) => {
  return (
    <>
      <div>
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
          <h2 className="text-2xl font-bold tracking-tighter">
            <span className="flex items-center gap-2">
              {icon}
              {heading}
            </span>
          </h2>
          <Link
            to={"/posts/all"}
            className="text-lg block font-medium text-primary hover:text-primary/90"
          >
            <Button>
              All Blogs <span>&rarr;</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
          {postData.map((data, index) => (
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
              views={data.views}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestBlogContainer;
