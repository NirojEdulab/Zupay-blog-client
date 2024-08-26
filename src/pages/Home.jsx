// import AllAuthors from "@/components/AllAuthors";
import HomeBanner from "@/components/HomeBanner";
import LatestBlogContainer from "@/components/LatestBlogContainer";
import LoadingScreen from "@/components/LoadingScreen";
import NoDataFound from "@/components/NoDataFound";
import useFetchAllPosts from "@/hooks/useFetchAllPosts";
import { Rss } from "lucide-react";

const Home = () => {
  const { loading, postData } = useFetchAllPosts();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!loading && postData.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="my-4">
      <HomeBanner postData={postData} />

      <div className="p-8">
        <LatestBlogContainer
          postData={postData.slice(0, 6)}
          heading={"Latest Blogs"}
          icon={<Rss />}
        />
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
