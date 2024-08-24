import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { cn } from "@/lib/utils";

const BlogCard = ({
  postId,
  title,
  shortDescription,
  imageUrl,
  createdAt,
  authorName,
  authorProPic,
  authorUserId,
}) => {
  const { authUser } = useContext(AuthContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!authUser) {
    return;
  }

  return (
    <>
      {!imgLoaded && <BlogCardSkeleton />}
      <div
        className={`${cn(
          `${
            !imgLoaded
              ? "rounded-lg border-2 hidden p-4"
              : "rounded-lg border-2 p-4"
          }`
        )}`}
      >
        <Link to={`/posts/${postId}`}>
          <div className="relative h-[230px]">
            <img
              src={imageUrl}
              alt={`${title} Image`}
              onLoad={() => setImgLoaded(true)}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </Link>

        <div className="flex justify-between items-center mt-2">
          <h1 className="font-semibold text-xl">{title}</h1>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm mt-2">
          {shortDescription}
        </p>

        <div className="flex flex-row items-center mt-4 gap-2">
          <Link to={`/profile/${authorUserId}`} onClick={goToTop}>
            <Avatar className="h-[30px] w-[30px] ">
              <AvatarImage
                src={
                  authorProPic
                    ? authorProPic
                    : `https://avatar.iran.liara.run/username?username=${authorName}`
                }
              />
            </Avatar>
          </Link>
          <Link to={`/profile/${authorUserId}`} onClick={goToTop}>
            <p className="text-md font-semibold">{authorName}</p>
          </Link>
          <p className="text-sm font-semibold">
            • {moment(createdAt).fromNow()}
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
