import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/Constants";

const useFetchAllUsers = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/auth/`, {
          withCredentials: true,
        });
        if (response.data.status === 200) {
          setUserData(response.data.data);
        } else {
          toast.error(response.data.message);
          console.log("error: ", response.data.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  return { userData, loading };
};

export default useFetchAllUsers;
