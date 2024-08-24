import axios from "axios";
import { API_URL } from "@/constants/Constants";
import toast from "react-hot-toast";

export const handleLogout = async (navigate, setAuthUser, setIsLoggedIn) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );

    if (response.data.status === 200) {
      toast.success(response.data.message);

      // Clear user data and token
      localStorage.removeItem("accessToken");
      setAuthUser(null);
      setIsLoggedIn(false);

      // Redirect to the home page
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error("Logout failed");
    console.error("Logout error:", error);
  }
};
