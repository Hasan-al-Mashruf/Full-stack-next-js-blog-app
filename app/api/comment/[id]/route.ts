import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { userMiddleware } from "@/middlwere/userValidation/userValidation";
import { IComment, IParams, IUser } from "@/types/types.global";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: IParams }) {
  try {
    const { id: userId } = (await userMiddleware()) as IUser;
    const blogId = params.id;
    const { content } = await req.json();

    // Check if the user already exists

    const existingComment = await prisma.comment.findFirst({
      where: {
        blogId,
        userId,
      },
    });

    if (existingComment) {
      return NextResponse.json(
        {
          status: false,
          message: "You can add only one comment",
        },
        { status: 400 }
      );
    }

    const newComment: IComment | null = await prisma.comment.create({
      data: {
        content,
        blogId,
        userId,
      },
    });

    return NextResponse.json({ status: true, data: newComment });
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
