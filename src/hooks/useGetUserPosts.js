import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/Constants";

const useGetUserPosts = (userId) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${API_URL}/auth/user/${userId}`, {
            withCredentials: true,
          });
          if (response.data.status === 200) {
            setUserPosts(response.data.data);
            setLoading(false);
          }
        }
      } catch (error) {
        setError(error);
        setLoading(false);
        toast.error(error.response.data.message);
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };

    getUserPosts();
  }, [userId]);

  return {
    userPosts: userPosts.posts ? userPosts.posts : [],
    loading,
    error,
    user: userPosts,
  };
};

export default useGetUserPosts;
