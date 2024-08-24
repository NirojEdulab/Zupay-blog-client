import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

const AllAuthors = ({ userId, username, fullName, profilePicURL }) => {
  return (
    <div className="p-5 flex items-center justify-start gap-2 border rounded-md w-80">
      <div className="rounded-full overflow-hidden max-w-12">
        <Link to={`/profile/${userId}`}>
          <Avatar>
            <AvatarImage
              src={
                profilePicURL
                  ? profilePicURL
                  : `https://avatar.iran.liara.run/username?username=${username}`
              }
              alt={`${username} profile picture`}
            ></AvatarImage>
          </Avatar>
        </Link>
      </div>
      <Link to={`/profile/${userId}`}>
        <div className="flex flex-col items-start">
          <h3 className="text-lg md:text-xl font-bold">{fullName}</h3>
          <p className="font-semibold text-sm md:text-lg text-muted-foreground">
            @{username}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AllAuthors;
