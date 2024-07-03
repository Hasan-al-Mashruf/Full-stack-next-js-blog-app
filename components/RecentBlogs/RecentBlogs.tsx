import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { IBlog } from "@/types/types.global";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getRecentBlogs } from "@/apis/serverApis";

const RecentBlogs = async () => {
  const user = await getCurrentUser();
  const recentBlogs = await getRecentBlogs();
  if (!recentBlogs) {
    return <div>Error loading blogs.</div>;
  }
  const { data } = recentBlogs;
  return (
    <>
      {data && data?.length > 0
        ? data.map((blog: IBlog) => (
            <BlogCard key={blog?.id} blog={blog} user={user} />
          ))
        : "No Blogs"}
    </>
  );
};

export default RecentBlogs;
