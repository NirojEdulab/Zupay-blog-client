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
  views,
}) => {
  const { authUser } = useContext(AuthContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!authUser) {
    return;
  }

  const getCompressedImageUrl = (url) => {
    const baseUrl = url.split("upload/")[0];
    const imagePath = url.split("upload/")[1];
    return `${baseUrl}upload/w_500,f_auto/${imagePath}`;
  };

  return (
    <>
      {!imgLoaded && <BlogCardSkeleton />}
      <div
        className={`${cn(
          `${
            !imgLoaded
              ? "rounded-lg border-2 hidden p-2"
              : "rounded-lg border-2 p-2"
          }`
        )}`}
      >
        <Link to={`/posts/${postId}`} onClick={goToTop}>
          <div className="relative h-[230px]">
            <img
              src={getCompressedImageUrl(imageUrl)}
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

        <div className="flex flex-row items-center mt-4 gap-1">
          <Link to={`/profile/${authorUserId}`} onClick={goToTop}>
            <Avatar className="h-[25px] w-[25px] object-cover">
              <AvatarImage
                src={
                  authorProPic
                    ? getCompressedImageUrl(authorProPic)
                    : `https://avatar.iran.liara.run/username?username=${authorName}`
                }
              />
            </Avatar>
          </Link>
          <Link to={`/profile/${authorUserId}`} onClick={goToTop}>
            <p className="text-sm sm:text-lg font-medium">{authorName}</p>
          </Link>
          <div className="flex flex-col justify-end items-end text-end w-full gap-x-1">
            <p className="text-sm font-normal">{moment(createdAt).fromNow()}</p>
            <p className="text-sm font-semibold">{views} views </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
