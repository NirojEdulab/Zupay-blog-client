import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle.jsx";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { FaUserCircle } from "react-icons/fa";
import {
  Book,
  BookOpen,
  CircleUserRound,
  Home,
  LogOut,
  UserRoundPlus,
} from "lucide-react";
import MobileSidebarScreen from "./MobileSidebarScreen";
import { handleLogout } from "@/hooks/useLogout";

const Header = () => {
  const navigate = useNavigate();
  const { authUser, isLoggedIn, setAuthUser, setIsLoggedIn } =
    useContext(AuthContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="w-full p-6 flex flex-row justify-between items-center border-b-2">
      <Link to={"/"} className="text-primary font-bold text-3xl text-wrap">
        <div className="flex">
          Mind<p className="text-red-600">Roam</p>
        </div>
      </Link>
      {/* <div>
        <input
          type="text"
          placeholder="Search"
          className="rounded-full p-2 w-full"
        />
      </div> */}
      <div className="gap-5 items-center hidden sm:flex">
        {isLoggedIn && (
          <>
            <Link to={"/create"}>
              <Button variant="outline">
                <BookOpen className="mr-2" />
                Create
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={
                      authUser && authUser.profilePic
                        ? authUser.profilePic
                        : `https://avatar.iran.liara.run/username?username=${authUser.username}`
                    }
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {authUser.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-1">
                <DropdownMenuLabel className="text-lg text-center">
                  Hey<span className="text-xl">&#128540;</span>,{" "}
                  {authUser.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="h-2 w-2" />
                <DropdownMenuItem
                  className="font-semibold text-md cursor-pointer border border-2-secondary rounded-md mt-1 w-full text-base text-center p-4"
                  onClick={() => handleNavigation("/")}
                >
                  {/* <Link to={`/`} className="flex items-start p-2 w-full"> */}
                  <Home size={24} className="mr-2" />
                  Home
                  {/* </Link> */}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-semibold text-md cursor-pointer border border-2-secondary rounded-md mt-1 w-full text-base text-center p-4"
                  onClick={() => handleNavigation(`/profile/${authUser._id}`)}
                >
                  {/* <Link
                    to={`/profile/${authUser._id}`}
                    className="flex items-center justify-start p-2 w-full"
                  > */}
                  <FaUserCircle size={24} className="mr-2" />
                  Profile
                  {/* </Link> */}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="font-semibold text-md cursor-pointer border border-2-secondary rounded-md mt-1 mb-2 w-full text-base text-center p-4"
                  onClick={() => handleNavigation(`/myposts/${authUser._id}`)}
                >
                  {/* <Link
                    to={`/myposts/${authUser._id}`}
                    className="flex items-center justify-start p-2 w-full"
                  > */}
                  <Book size={24} className="mr-2" />
                  My Posts
                  {/* </Link> */}
                </DropdownMenuItem>

                <Separator />

                <DropdownMenuItem
                  onClick={() =>
                    handleLogout(navigate, setAuthUser, setIsLoggedIn)
                  }
                  className="font-semibold text-md cursor-pointer border border-2-secondary rounded-md mt-2 w-full text-base text-center p-4"
                >
                  <LogOut size={24} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to={"/login"}>
              <Button variant="outline">
                <CircleUserRound className="mr-2" /> Login
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button>
                <UserRoundPlus className="mr-2" />
                Register
              </Button>
            </Link>
          </>
        )}

        <ModeToggle />
      </div>

      {/* Mobile Screen */}
      <MobileSidebarScreen />
    </header>
  );
};

export default Header;
