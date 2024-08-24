import ProfileBanner from "@/components/ProfileBanner";
import UserBlogs from "@/components/UserBlogs";

const UserProfile = () => {
  return (
    <div className="w-full mx-auto border border-2-secondary rounded-md p-2">
      <ProfileBanner />
      <UserBlogs />
    </div>
  );
};

export default UserProfile;
