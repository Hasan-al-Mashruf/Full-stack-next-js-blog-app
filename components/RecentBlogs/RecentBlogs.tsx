import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { IBlog } from "@/types/types.global";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getRecentBlogs } from "@/apis/serverApis";
import Pagination from "../Pagination/Pagination";

const RecentBlogs = async ({ searchParams }) => {
  console.log({ searchParams });
  const user = await getCurrentUser();
  const recentBlogs = await getRecentBlogs(searchParams);
  if (!recentBlogs) {
    return <div>Error loading blogs.</div>;
  }
  const { data, meta } = recentBlogs;
  return (
    <>
      {data && data?.length > 0 ? (
        <div>
          {data.map((blog: IBlog) => (
            <BlogCard key={blog?.id} blog={blog} user={user} />
          ))}
          <Pagination meta={meta} />
        </div>
      ) : (
        "No Blogs"
      )}
    </>
  );
};

export default RecentBlogs;
