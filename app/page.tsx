import RecentBlogs from "@/components/RecentBlogs/RecentBlogs";
import { Suspense } from "react";
import Loading from "./loading";
import UserSuggestion from "@/components/UserSuggestion/UserSuggestion";

const Home = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-3">
        <Suspense fallback={<Loading />}>
          <RecentBlogs />
        </Suspense>
      </div>
      <div>
        <h4>Who to Follow</h4>
        <Suspense fallback={<Loading />}>
          <UserSuggestion />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
