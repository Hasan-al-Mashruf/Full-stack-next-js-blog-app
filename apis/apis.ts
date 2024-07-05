import axiosInstance from "@/lib/axios";
import {
  IBlog,
  IComment,
  IUser,
  ICategory,
  ILike,
  IReport,
  IResponse,
} from "@/types/types.global";
import { AxiosError } from "axios";

// User API
export const registerUser = async (
  userInfo: Partial<IUser>
): Promise<IResponse<any> | AxiosError<any>> => {
  const response = await axiosInstance.post("/auth/register", userInfo);
  return response.data;
};

export const createNewBlog = async (
  blogInfo: Partial<IBlog>
): Promise<IResponse<IBlog> | AxiosError<any>> => {
  const response = await axiosInstance.post<IResponse<IBlog>>(
    "/blog",
    blogInfo
  );
  return response.data;
};

// Comments API
export const postNewComment = async (
  comment: Partial<IComment>,
  blogId: string
): Promise<IResponse<IComment> | AxiosError<any>> => {
  const response = await axiosInstance.post(`/comment/${blogId}`, comment);
  return response.data;
};

// Like API
export const postNewLike = async (
  blogId: string
): Promise<IResponse<undefined> | AxiosError<any>> => {
  const response = await axiosInstance.post(`/like/${blogId}`);
  return response.data;
};

// Report API
export const postNewReport = async (
  reportedUserId: number
): Promise<IReport> => {
  const response = await axiosInstance.post<IReport>(
    `/report/${reportedUserId}`
  );
  return response.data;
};

export const showMore = async (blogId: string) => {
  const response = await axiosInstance.put(`/user/showMoreCat/${blogId}`);
  return response.data;
};

export const showLess = async (blogId: string) => {
  const response = await axiosInstance.put(`/user/showLessCat/${blogId}`);
  return response.data;
};

export const followUser = async (followingUserId: string) => {
  const response = await axiosInstance.put(`/user/follow/${followingUserId}`);
  return response.data;
};

export const reportUser = async (reportedUserId: string) => {
  const response = await axiosInstance.put(`/user/report/${reportedUserId}`);
  return response.data;
};
