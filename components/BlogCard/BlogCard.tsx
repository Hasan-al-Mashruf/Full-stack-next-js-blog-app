"use client";
import { FC, useEffect, useState } from "react";
import parse from "html-react-parser";
import { IBlog } from "@/types/types.global";
import Link from "next/link";
import { postNewLike } from "@/apis/apis";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { MessageCircleMore, ThumbsUp } from "lucide-react";

const BlogCard: FC<{ blog: IBlog; user: any }> = ({ blog, user }) => {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const postANewLike = async (blogId: string) => {
    try {
      const resposne = await postNewLike(blogId);
      if (resposne.status) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        const response: any = error.response;
        toast.error(response?.data?.message ?? "Something went wrong");
      }
    }
  };

  useEffect(() => {
    const checkLiked = () => {
      if (Array.isArray(blog.like)) {
        const liked = blog.like.some(
          (likedUser) => likedUser?.userId === user?.id
        );
        setIsLiked(liked);
      }
    };
    checkLiked();
  }, [blog?.like, user?.id]);

  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden mt-6 w-full p-6">
      <div className="flex items-centerspace-x-2 mb-4 gap-1">
        <img
          src={blog?.user?.image ?? "https://via.placeholder.com/24"}
          alt="User Image"
          className="w-6 h-6 rounded-full"
        />
        <span className="text-gray-900 font-medium text-sm">
          {blog?.user?.name}
        </span>
        <span className="text-gray-500 text-sm">in</span>
        <span className="text-gray-900 font-medium text-sm">CodeX</span>
      </div>
      <div className="flex justify-between gap-8">
        <div>
          <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
            <Link
              href={`/blog/${blog.id}`}
              className="text-2xl font-bold capitalize"
            >
              {blog?.title}
            </Link>
          </div>
          {parse(blog?.content)}
          <div className="flex items-center mt-4 gap-3">
            <span className="text-gray-500 text-sm">Apr 1</span>
            <div className="flex items-center">
              <Button
                onClick={() => postANewLike(blog.id)}
                disabled={isLiked}
                className="p-0"
                variant={"ghost"}
              >
                <ThumbsUp className="w-4" />
                {blog?.like?.length}
              </Button>
            </div>
            <Link href={`/blog/${blog.id}/#commentSection`}>
              <div className="flex items-center cursor-pointer">
                <MessageCircleMore className="w-4" />

                <span className=" text-gray-500 text-sm">
                  {" "}
                  {blog?.comments?.length}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[200px]">
          <img
            className="object-cover w-full"
            src={blog?.featuredImg}
            alt="blog images"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
