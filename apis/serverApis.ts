"use server";
import axiosInstance from "@/lib/axios";
import { IBlog, IResponse } from "@/types/types.global";
import { headers } from "next/headers";

export const suggetedUsers = async () => {
  const response = await axiosInstance.get("/suggestedUsers", {
    headers: headers(),
  });
  return response.data;
};

// Category API
// export const getCategories = async (): Promise<ICategory[]> => {
//   const response = await axiosInstance.get<ICategory[]>("/category");
//   return response.data;
// };

// Blog API

export const getRecentBlogs = async (): Promise<IResponse<IBlog[]> | null> => {
  try {
    const response = await axiosInstance.get("/blog", {
      headers: headers(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSingleBlog = async (
  blogId: string
): Promise<IResponse<IBlog> | null> => {
  try {
    const response = await axiosInstance.get(`/blog/${blogId}`, {
      headers: headers(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
