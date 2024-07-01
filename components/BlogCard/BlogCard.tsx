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
          (likedUser) => likedUser.userId === user.id
        );
        setIsLiked(liked);
      }
    };

    checkLiked();
  }, [blog.like, user.id]);

  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden mt-6 w-full">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={blog?.featuredImg}
            alt="blog images"
          />
        </div>
        <div className="p-8">
          <div className="flex items-center space-x-2">
            <img
              src={blog?.user?.image ?? "https://via.placeholder.com/24"}
              alt="User Image"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-gray-900 font-medium">
              {blog?.user?.name}
            </span>
            <span className="text-gray-500">in</span>
            <span className="text-gray-900 font-medium">CodeX</span>
          </div>
          <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
            <Link href={`/blog/${blog.id}`}> {blog?.title}</Link>
          </div>
          {parse(blog?.content)}
          <div className="flex items-center mt-4">
            <span className="text-gray-500 text-sm">Apr 1</span>
            <Button onClick={() => postANewLike(blog.id)} disabled={isLiked}>
              {blog?.like?.length} Like
            </Button>
            <span className="ml-4 text-gray-500 text-sm">
              {" "}
              {blog?.comments?.length} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
