import { prisma } from "@/lib/db";
import { userMiddleware } from "@/middlwere/userValidation/userValidation";
import { IParams, IUser } from "@/types/types.global";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: IParams }) {
  try {
    const { id: userId } = (await userMiddleware()) as IUser;
    const blogId = params.id;
    // Check if the user already liked the blog
    const existingLike = await prisma.like.findFirst({
      where: {
        blogId,
        userId,
      },
    });

    if (existingLike) throw new Error("You can like once");
    // Create a new like
    await prisma.like.create({
      data: {
        blogId,
        userId,
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: (error as any).message ?? "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
