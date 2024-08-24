// import AllAuthors from "@/components/AllAuthors";
import HomeBanner from "@/components/HomeBanner";
import LatestBlogContainer from "@/components/LatestBlogContainer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useFetchAllUsers from "@/hooks/useFetchAllUsers";
import { Rss, UsersRound } from "lucide-react";

const Home = () => {
  // const { userData, loading } = useFetchAllUsers();
  // const homeUsers = userData.slice(0, 10);

  // if (loading) {
  //   return;
  // }

  return (
    <div className="my-4">
      <HomeBanner />

      <div className="p-8">
        <LatestBlogContainer heading={"Latest Blogs"} icon={<Rss />} />
      </div>

      {/* <div>
        {homeUsers.length > 0 && (
          <div className="border rounded-md m-4">
            <h3 className="text-2xl font-bold px-6 mt-4">
              <span className="flex items-center gap-2">
                <UsersRound /> Authors
              </span>
            </h3>
            <ScrollArea className="whitespace-nowrap p-2 mt-2 w-full gap-2">
              <div className="flex gap-2">
                {homeUsers.map((user, index) => (
                  <AllAuthors
                    key={index}
                    userId={user._id}
                    username={user.username}
                    fullName={user.fullName}
                    profilePicURL={user.profilePic}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Home;
