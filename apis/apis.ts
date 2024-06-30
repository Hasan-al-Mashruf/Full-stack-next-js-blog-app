import axiosInstance from "@/lib/axios";
import {
  IBlog,
  IComment,
  IUser,
  ICategory,
  ILike,
  IReport,
} from "@/types/types.global";

// User API
export const registerUser = async (userInfo: IUser): Promise<IUser> => {
  const response = await axiosInstance.post<IUser>("/auth/register", userInfo);
  return response.data;
};

// Category API
export const getCategories = async (): Promise<ICategory[]> => {
  const response = await axiosInstance.get<ICategory[]>("/category");
  return response.data;
};

// Blog API
export const getRecentBlogs = async (): Promise<IBlog[]> => {
  const response = await axiosInstance.get<IBlog[]>("/blog");
  return response.data;
};

export const getSingleBlog = async (blogId: number): Promise<IBlog> => {
  const response = await axiosInstance.get<IBlog>(`/blog/${blogId}`);
  return response.data;
};

export const createNewBlog = async (blogInfo: IBlog): Promise<IBlog> => {
  const response = await axiosInstance.post<IBlog>("/blog", blogInfo);
  return response.data;
};

// Comments API
export const getComments = async (blogId: number): Promise<IComment[]> => {
  const response = await axiosInstance.get<IComment[]>(`/comment/${blogId}`);
  return response.data;
};

export const postNewComment = async (
  comment: Partial<IComment>,
  blogId: number
): Promise<IComment> => {
  const response = await axiosInstance.post<IComment>(
    `/comment/${blogId}`,
    comment
  );
  return response.data;
};

// Like API
export const getLikes = async (blogId: number): Promise<ILike[]> => {
  const response = await axiosInstance.get<ILike[]>(`/like/${blogId}`);
  return response.data;
};

export const postNewLike = async (blogId: number): Promise<ILike> => {
  const response = await axiosInstance.post<ILike>(`/like/${blogId}`);
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
