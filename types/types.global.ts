export interface IParams {
  id: string;
}

export interface IResponse<T = undefined> {
  status: boolean;
  message?: string;
  data?: T | any;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
  blogs?: IBlog[];
  follower?: IFollow[];
  following?: IFollow[];
  comment?: IComment[];
  like?: ILike[];
  reporter?: IReport[];
  reported?: IReport[];
  followingCat?: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface IFollow {
  id: string;
  followerId: string;
  followingId: string;
  follower: IUser;
  following: IUser;
}

export interface IBlog {
  id: string;
  title: string;
  content: string;
  featuredImg: string;
  published: boolean;
  user?: IUser;
  userId?: string;
  like?: ILike[];
  categories?: ICategory[];
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  id: string;
  name: string;
  blog?: IBlog[];
  FollowedUser?: IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  id: string;
  content: string;
  blogId: string;
  userId: string;
  blog?: IBlog;
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILike {
  id: string;
  blogId: string;
  userId: string;
  blog: IBlog;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReport {
  id: string;
  reporterId: string;
  reportedId: string;
  reporter: IUser;
  reported: IUser;
  createdAt: Date;
  updatedAt: Date;
}
