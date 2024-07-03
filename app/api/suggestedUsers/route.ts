import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();
    console.log({ user }, "user paisi suuggested page a");

    const suggestedUsers = await prisma.user.findMany({
      include: {
        followingCat: true,
      },
      where: {
        id: { not: user?.id },
        OR: [
          {
            followingCat: {
              // using some to find records that at least have one match
              some: {
                id: {
                  in: user?.followingCat.map((cat) => cat.id),
                },
              },
            },
          },
          {
            followingCat: {
              some: {
                id: {
                  notIn: user?.followingCat.map((cat) => cat.id),
                },
              },
            },
          },
        ],
      },
      take: 3,
      orderBy: {
        followingCat: {
          _count: "desc",
        },
      },
    });
    return NextResponse.json({ status: true, data: suggestedUsers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
