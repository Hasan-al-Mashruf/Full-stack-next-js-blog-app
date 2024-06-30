import { getServerSession } from "next-auth";
import { prisma } from "./db";

export const getCurrentSession = async () => {
  const session = await getServerSession();
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
    },
  });

  return existingUser;
};
