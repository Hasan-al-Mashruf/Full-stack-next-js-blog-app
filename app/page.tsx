import RecentBlogs from "@/components/RecentBlogs/RecentBlogs";
import { Suspense } from "react";
import Loading from "./loading";

const Home = () => {
  return (
    <div>
      <h2>This is Home Page</h2>
      <Suspense fallback={<Loading />}>
        <RecentBlogs />
      </Suspense>
    </div>
  );
};

export default Home;
