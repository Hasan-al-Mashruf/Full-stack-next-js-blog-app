import { getSingleBlog } from "@/apis/apis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IBlog, IParams } from "@/types/types.global";
import parse from "html-react-parser";
import React, { FC } from "react";

const SingleBlogPage: FC<{ params: IParams }> = async ({ params }) => {
  const blogId = params?.id;
  const singleBlog = await getSingleBlog(blogId);

  if (!singleBlog) return <p>Error loading data</p>;
  const { data } = singleBlog;

  if (!Array.isArray(data.categories)) return null;

  const categories = data?.categories.map((category) => category.name);

  return (
    <div className="mx-auto w-1/2 max-w-3xl flex flex-col gap-5">
      <h1 className="text-5xl font-bold capitalize">{data?.title}</h1>
      <div className="flex items-center gap-2 ">
        <Avatar className="w-14 h-14">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-2">
            <div>{data?.user?.name}</div>
            <span>.</span>
            <span className="underline">Follow</span>
          </div>
          <div>Published in {categories}</div>
        </div>
      </div>
      <div>
        <img src={data?.featuredImg} alt={data?.title} className="w-full" />
      </div>

      {parse((data as any).content)}
    </div>
  );
};

export default SingleBlogPage;
