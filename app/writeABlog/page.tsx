import React from "react";
import { getCurrentSession } from "@/lib/getCurrentUser";
import WriteABlogForm from "./WriteABlogForm";
import { getCategories } from "@/apis/serverApis";

const writeABlog = async () => {
  const sessionPromise = getCurrentSession();
  const categoriesPromise = getCategories();

  // use priomise.all to call both function at concurrently
  const [session, categories] = await Promise.all([
    sessionPromise,
    categoriesPromise,
  ]);

  return (
    <div>
      <WriteABlogForm session={session} categories={categories} />
    </div>
  );
};

export default writeABlog;
