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
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuthUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (emailOrUsername && password) {
        const response = await axios.post(
          `${API_URL}/auth/login`,
          {
            emailOrUsername,
            password,
          },
          { withCredentials: true }
        );
        if (response.data.status === 200) {
          toast.success(response.data.message);
          setAuthUser(response.data.data);
          setIsLoggedIn(true);
          localStorage.setItem("accessToken", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Please enter all the data");
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
    <div className="flex justify-center items-center h-[calc(100vh-150px)]">
      <Card className="w-[450px]">
        <CardHeader className="text-center mb-8">
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription className="text-wrap text-base">
            You can login using email/username and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-md">
                  Email / Username
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    placeholder="Email Address / Username"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                  />
                  <Mail size={"24px"} />
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
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-sm mt-2">
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              className="text-green-800 font-bold underline"
            >
              join us today.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
