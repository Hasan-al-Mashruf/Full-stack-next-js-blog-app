import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const user = await getCurrentUser();
    const followingUserId = params?.id;

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        // this is a compund key
        followerId_followingId: {
          followerId: followingUserId,
          followingId: user?.id,
        },
      },
    });

    if (existingFollow) throw new Error("You have already followed him");

    const newData = await prisma.follow.create({
      data: {
        followerId: followingUserId,
        followingId: user?.id,
      },
    });

    console.log(newData);

    return NextResponse.json({ status: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        status: false,
        message: (error as any).message ?? "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
