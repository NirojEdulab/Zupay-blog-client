import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/constants/Constants";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`${API_URL}/auth/verify`, { withCredentials: true })
        .then((response) => {
          if (response.data.status === 200) {
            setAuthUser(response.data.user);
            setIsLoggedIn(true);
          }
        })
        .catch(() => {
          setAuthUser(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
