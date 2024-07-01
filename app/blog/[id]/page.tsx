import { getSingleBlog } from "@/apis/apis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IBlog, ICategory, IParams } from "@/types/types.global";
import parse from "html-react-parser";
import React, { FC } from "react";
import CommentCard from "@/components/Comment/CommentCard";
import CommentForm from "@/components/Comment/CommentForm";

const SingleBlogPage: FC<{ params: IParams }> = async ({ params }) => {
  const blogId = params?.id;
  const singleBlog = await getSingleBlog(blogId);
  if (!singleBlog) return <p>Error loading data</p>;
  const { data } = singleBlog as any;
  if (!Array.isArray(data.categories) && !Array.isArray(data.comments))
    return null;
  const categories = data?.categories.map(
    (category: ICategory) => category.name
  );
  const comments = data.comments;
  console.log(data.comments);
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
      <div>
        <CommentForm blogId={blogId} />
        {comments.map((comment: any) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default SingleBlogPage;
