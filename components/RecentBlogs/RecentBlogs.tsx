import { getRecentBlogs } from "@/apis/apis";
import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { IBlog } from "@/types/types.global";
import { getCurrentUser } from "@/lib/getCurrentUser";

const RecentBlogs = async () => {
  const user = await getCurrentUser();
  const recentBlogs = await getRecentBlogs();
  if (!recentBlogs) {
    return <div>Error loading blogs.</div>;
  }
  const { data } = recentBlogs;
  return (
    <div className="grid grdi-cols-4">
      <div className="col-span-3">
        {data && data?.length > 0
          ? data.map((blog: IBlog) => (
              <BlogCard key={blog.id} blog={blog} user={user} />
            ))
          : "No Blogs"}
      </div>
    </div>
  );
};

export default RecentBlogs;
