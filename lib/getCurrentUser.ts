import { getServerSession } from "next-auth";
import { prisma } from "./db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
};

export const getCurrentUser = async () => {
  const sessionUser = await getCurrentSession();
  if (!sessionUser?.email) return null;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: sessionUser.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      followingCat: true,
    },
  });

  return existingUser;
};
