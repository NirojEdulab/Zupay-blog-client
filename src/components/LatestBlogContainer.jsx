import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/Constants";
import toast from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import { CircleChevronUp } from "lucide-react";
import LoadingScreen from "./LoadingScreen";

const LatestBlogContainer = ({ heading, icon }) => {
  const [latestData, setLatestData] = useState([]);
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      SetLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      if (response.data.status === 200) {
        setLatestData(response.data.data.slice(0, 6));
      }
    } catch (error) {
      SetLoading(false);
      toast.error(error?.message);
      console.log("error: ", error);
    } finally {
      SetLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!loading && (
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
            {latestData.map((data, index) => (
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
        </div>
      )}
    </>
  );
};

export default LatestBlogContainer;
