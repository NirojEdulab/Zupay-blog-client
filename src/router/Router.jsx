import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, useEffect, useState } from "react";

const Footer = lazy(() => import("../components/Footer.jsx"));
const Header = lazy(() => import("../components/Header"));
const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const CreatePost = lazy(() => import("../pages/CreatePost"));
const EditPost = lazy(() => import("../pages/EditPost"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Login = lazy(() => import("../pages/Login"));
const PostDetails = lazy(() => import("../pages/PostDetails"));
const Signup = lazy(() => import("../pages/Signup"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const AllBlogs = lazy(() => import("../pages/AllBlogs"));
const EditProfile = lazy(() => import("../pages/EditProfile"));

import { Suspense, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen.jsx";
import axios from "axios";
import BlogCardSkeleton from "@/components/BlogCardSkeleton.jsx";

const Router = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on component unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <Home /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route
            path="/myposts/:id"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <CreatePost /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route
            path="/posts/:id/edit"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <EditPost /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <Navigate to="/" /> : <Login />}
              </Suspense>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <PostDetails />
              </Suspense>
            }
          />
          <Route
            path="/posts/all"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <AllBlogs /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <Navigate to="/login" /> : <Signup />}
              </Suspense>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="/profile/:id/edit"
            element={
              <Suspense fallback={<LoadingScreen />}>
                {isLoggedIn ? <EditProfile /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <ErrorPage />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Router;
