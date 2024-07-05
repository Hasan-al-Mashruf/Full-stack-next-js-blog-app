import { prisma } from "@/lib/db";
import { userMiddleware } from "@/middlwere/userValidation/userValidation";
import { IUser } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = (await userMiddleware()) as IUser;
    const followingCatIds = user.followingCat?.map((cat) => cat.id) || [];
    const suggestedUsers = await prisma.user.findMany({
      include: {
        followingCat: true,
        follower: true,
        following: true,
      },
      where: {
        // Exclude current user
        id: { not: user?.id },
        follower: {
          none: {
            followingId: user?.id,
          },
        },
        OR: [
          {
            followingCat: {
              // Using some to find records that at least have one match
              some: {
                id: {
                  in: followingCatIds,
                },
              },
            },
          },
          {
            followingCat: {
              some: {
                id: {
                  // shpowing all records if not found any
                  notIn: followingCatIds,
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
    console.log(suggestedUsers);
    return NextResponse.json({ status: true, data: suggestedUsers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
