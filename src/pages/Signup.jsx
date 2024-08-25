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
import axios from "axios";
import { AtSign, Eye, EyeOff, Loader2, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!fullName || !email || !username || !password) {
      toast.error("Please fill all the fields.");
      return false;
    }

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const registerUser = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/register`, {
        fullName,
        email,
        username,
        password,
      });
      if (response.data.status === 200) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 sm:mt-2 sm:h-[calc(100vh-160px)]">
      <Card className="w-[450px]">
        <CardHeader className="text-center mb-8">
          <CardTitle className="text-3xl">Join Us Today</CardTitle>
          <CardDescription className="text-wrap text-base">
            You can register yourself to get the perfect blogs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* FullName */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname" className="text-md">
                  Full Name
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="fullname"
                    placeholder="Enter your fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <UserRound size={"24px"} />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-md">
                  Email
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail size={"24px"} />
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <AtSign size={"24px"} />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-md">
                  Password
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <EyeOff
                      size={"24px"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <Eye
                      size={"24px"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
                {/* <div
                  className="absolute pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div> */}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col">
          <Button onClick={registerUser} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-sm mt-2">
            Already a member?{" "}
            <Link to={"/login"} className="text-green-800 font-bold underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
