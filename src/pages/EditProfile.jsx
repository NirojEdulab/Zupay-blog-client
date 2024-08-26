import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/constants/Constants";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { CircleX, Loader2 } from "lucide-react";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coverImageLoading, setCoverImageLoading] = useState(true);
  const [profileImageLoading, setProfileImageLoading] = useState(true);

  const coverImageRef = useRef(null);
  const profileImageRef = useRef(null);

  const [formData, setFormData] = useState({
    email: authUser?.email || "",
    fullName: authUser?.fullName || "",
    username: authUser?.username || "",
    password: "",
    coverImage: authUser?.coverImage || null,
    profileImage: authUser?.profilePic || null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const file = files[0];
    if (file) {
      // Update the corresponding state with the new image URL
      const imageUrl = URL.createObjectURL(file);

      if (id === "coverImage") {
        setCoverImage(imageUrl); // Update the preview for the cover image
        setFormData({ ...formData, coverImage: file }); // Store the file for submission
      } else if (id === "profileImage") {
        setProfileImage(imageUrl); // Update the preview for the profile image
        setFormData({ ...formData, profileImage: file }); // Store the file for submission
      }
    }
  };

  const handleImageClick = (type) => {
    if (type === "cover") {
      coverImageRef.current.click();
    } else if (type === "profile") {
      profileImageRef.current.click();
    }
  };

  const handleRemoveImage = (type) => {
    if (type === "profileImage") {
      setProfileImage(null);
      setFormData({ ...formData, profileImage: null });
      if (profileImageRef.current) {
        profileImageRef.current.value = null; // Clear the file input
      }
    } else if (type === "coverImage") {
      setCoverImage(null);
      setFormData({ ...formData, coverImage: null });
      if (coverImageRef.current) {
        coverImageRef.current.value = null; // Clear the file input
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.email === authUser.email &&
      formData.fullName === authUser.fullName &&
      formData.username === authUser.username &&
      formData.password === "" &&
      !profileImage &&
      !coverImage
    ) {
      toast.error("No changes detected.");
      return;
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("fullName", formData.fullName);
    data.append("username", formData.username);
    data.append("password", formData.password);

    if (formData.coverImage) {
      data.append("coverImage", formData.coverImage);
    }

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/auth/update/${authUser._id}`,
        data,
        { withCredentials: true }
      );

      if (response.data.status === 200) {
        toast.success("Profile updated successfully!");
        navigate(`/profile/${authUser._id}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update profile. Please try again.");
      console.log("error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCompressedImageUrl = (url, width) => {
    const baseUrl = url.split("upload/")[0];
    const imagePath = url.split("upload/")[1];
    return `${baseUrl}upload/w_${width},f_auto/${imagePath}`;
  };

  if (!authUser) {
    return;
  }

  return (
    <div className="flex justify-center items-center p-2">
      <Card className="w-[650px]">
        <CardHeader className="text-center mb-2">
          <CardTitle className="text-3xl font-semibold">Profile</CardTitle>
          <CardDescription className="text-wrap text-base">
            You can edit your details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <input
              type="file"
              id="coverImage"
              className="mt-2 hidden"
              ref={coverImageRef}
              onChange={handleFileChange}
            />

            <input
              type="file"
              id="profileImage"
              className="mt-2 hidden"
              ref={profileImageRef}
              onChange={handleFileChange}
            />
            {/* Cover Image */}
            <div className="relative">
              <div className="relative flex justify-center items-center">
                {coverImage && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveImage("coverImage")}
                    className="absolute top-2 right-2 p-1 rounded-full shadow-md"
                  >
                    <CircleX />
                  </Button>
                )}
                {coverImageLoading && (
                  <div className="w-full h-48 bg-gray-200 animate-pulse rounded-md"></div>
                )}
                <img
                  type="file"
                  accept="image/*"
                  className={`w-full h-48 object-cover rounded-md cursor-pointer ${
                    coverImageLoading ? "hidden" : ""
                  }`}
                  src={coverImage || getCompressedImageUrl(authUser?.coverImage,1280)}
                  
                  alt={`cover picture`}
                  onClick={() => handleImageClick("cover")}
                  onLoad={() => setCoverImageLoading(false)}
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80`;
                  }}
                />
                {!coverImage && (
                  <div className="absolute flex items-center justify-center inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      className="p-2 bg-secondary rounded-full shadow-md hover:bg-secondary"
                      onClick={() => handleImageClick("cover")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative flex justify-center items-center px-5 -mt-12">
              {profileImageLoading && (
                <div className="h-32 w-32 bg-gray-200 animate-pulse rounded-full"></div>
              )}
              <img
                type="file"
                accept="image/*"
                className={`h-32 w-32 bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient p-1 rounded-full object-cover cursor-pointer ${
                  profileImageLoading ? "hidden" : ""
                }`}
                src={
                  profileImage ||
                  getCompressedImageUrl(authUser?.profilePic, 500) ||
                  `https://avatar.iran.liara.run/username?username=${formData.username}`
                }
                
                alt={`profile picture`}
                onClick={() => handleImageClick("profile")}
                onLoad={() => setProfileImageLoading(false)}
                onError={(e) => {
                  e.target.src = `https://avatar.iran.liara.run/username?username=${formData.username}`;
                }}
              />
              {profileImage && (
                <div className="absolute flex items-end justify-center inset-0 mt-36">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("profileImage")}
                    className="bg-secondary p-1 rounded-full shadow-md"
                  >
                    <CircleX />
                  </button>
                </div>
              )}
              {!profileImage && (
                <div className="absolute flex items-center justify-center inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    className="p-2 bg-secondary rounded-full shadow-md hover:bg-secondary"
                    onClick={() => handleImageClick("profile")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 w-full items-center gap-4 sm:gap-x-6 p-4">
              {/* Email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-md">
                  Email
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    placeholder="Enter your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* FullName */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname" className="text-md">
                  Full Name
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="fullName"
                    placeholder="Enter your fullname"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username" className="text-md">
                  Username
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="username"
                    placeholder="Enter your Username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-md">
                  Change Password
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="password"
                    placeholder="Enter your new password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col">
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditProfile;
