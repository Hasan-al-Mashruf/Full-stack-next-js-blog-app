import { getRecentBlogs } from "@/apis/apis";
import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { IBlog } from "@/types/types.global";

const RecentBlogs = async () => {
  const { data }: { data: IBlog[] | null } = await getRecentBlogs();
  return (
    <div className="grid grdi-cols-4">
      <div className="col-span-3">
        {data && data?.length > 0
          ? data.map((blog: IBlog) => <BlogCard key={blog.id} blog={blog} />)
          : "No Blogs"}
      </div>
    </div>
  );
};

export default RecentBlogs;
