import { CircleChevronUp } from "lucide-react";
import ScrollToTop from "react-scroll-to-top";
import BlogCard from "./BlogCard";
import NoDataFound from "./NoDataFound";

const UserBlogs = ({ userPost = [], user }) => {
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
        {userPost.length > 0 &&
          userPost.map((data, index) => (
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
      {userPost.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <NoDataFound />
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
