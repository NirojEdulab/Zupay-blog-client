import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/Constants";
import { useLocation } from "react-router-dom";

const useFetchAllPosts = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getAllPosts = async () => {
      if (!hasMore) return;
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/posts?page=${page}`);
        if (response.data.status === 200) {
          const newPosts = response.data.data;
          setPostData((prev) => [...prev, ...response.data.data]);

          if (newPosts.length === 0 || newPosts.length < 6) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
          toast.error(response.data.message);
          console.log("error: ", response.data.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
        setHasMore(false);
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };

    getAllPosts();
  }, [page]);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useState(() => {
    if (location.pathname === "/posts/all") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, hasMore, loading]);

  return { postData, loading };
};

export default useFetchAllPosts;
