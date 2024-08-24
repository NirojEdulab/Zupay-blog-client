import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { FaBars } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import MobileSidebarLinks from "./MobileSidebarLinks";
import {
  Book,
  CircleUserRound,
  FilePlus,
  Home,
  LogOut,
  User2,
} from "lucide-react";
import { handleLogout } from "@/hooks/useLogout";

const MobileSidebarScreen = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser, setIsLoggedIn } = useContext(AuthContext);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsSheetOpen(false);
  };

  return (
    <>
      {authUser && (
        <div className="flex sm:hidden gap-2">
          <ModeToggle />

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <FaBars />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <div className="flex text-4xl font-bold items-center justify-center mb-4">
                    Mind<p className="text-red-600">Roam</p>
                  </div>
                </SheetTitle>
                <Separator />
                <SheetDescription
                  asChild
                  className="flex justify-center items-center"
                >
                  <div className="w-full mx-auto p-2 flex flex-col justify-center items-center">
                    <Link to={`/profile/${authUser._id}`}>
                      <img
                        src={
                          authUser && authUser.profilePic
                            ? authUser.profilePic
                            : `https://avatar.iran.liara.run/username?username=${authUser.username}`
                        }
                        loading="lazy"
                        alt={`${authUser} profile picture`}
                        onError={(e) => {
                          e.target.src = `https://avatar.iran.liara.run/username?username=${authUser.username}`;
                        }}
                        className="rounded-full w-[100px] h-[100px] object-cover mb-2"
                      />
                    </Link>
                    <Link to={`/profile/${authUser._id}`}>
                      <div className="mb-4">
                        <p className="text-xl font-bold text-primary">
                          {authUser.fullName}
                        </p>
                        <span className="text-sm font-semibold text-muted-foreground">
                          @{authUser.username}
                        </span>
                      </div>
                    </Link>

                    <Separator />

                    <MobileSidebarLinks
                      pathRef={"/"}
                      pathName={"Home"}
                      icon={<Home />}
                      isLast={false}
                      handleNavigation={handleNavigation}
                    />
                    <MobileSidebarLinks
                      pathRef={`/profile/${authUser._id}`}
                      pathName={"Profile"}
                      icon={<User2 />}
                      isLast={false}
                      handleNavigation={handleNavigation}
                    />
                    <MobileSidebarLinks
                      pathRef={`/create`}
                      pathName={"Create Post"}
                      icon={<FilePlus />}
                      isLast={false}
                      handleNavigation={handleNavigation}
                    />
                    <MobileSidebarLinks
                      pathRef={`/myposts/${authUser._id}`}
                      pathName={"My Posts"}
                      icon={<Book />}
                      isLast={true}
                      handleNavigation={handleNavigation}
                    />

                    <Separator />

                    <div
                      className="border border-2-secondary rounded-md mt-2 w-full"
                      onClick={() =>
                        handleLogout(navigate, setAuthUser, setIsLoggedIn)
                      }
                    >
                      <div className="flex justify-center items-center gap-2 hover:bg-secondary rounded-md p-3 cursor-pointer">
                        <span className="text-3xl text-primary">
                          {<LogOut />}
                        </span>
                        <h3 className="text-lg text-primary font-semibold">
                          {"Logout"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {!authUser && (
        <div className="flex sm:hidden gap-2">
          <Link to={"/login"}>
            <Button variant="outline">
              <CircleUserRound className="mr-2" /> Login
            </Button>
          </Link>
          <ModeToggle />
        </div>
      )}
    </>
  );
};

export default MobileSidebarScreen;
