import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: IParams }) {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User does not exist",
      });
    }
    const blogId = params.id;

    // Check if the user already liked the blog
    const existingLike = await prisma.like.findFirst({
      where: {
        blogId,
        userId: user.id,
      },
    });

    console.log({ existingLike });
    if (existingLike) {
      return NextResponse.json(
        {
          status: false,
          message: "You can like once",
        },
        { status: 400 }
      );
    }

    await prisma.like.create({
      data: {
        blogId,
        userId: user.id,
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
