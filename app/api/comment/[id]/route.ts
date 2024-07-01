import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { IComment, IParams } from "@/types/types.global";
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
    const { content } = await req.json();

    // Check if the user already exists
    console.log(content, blogId, user.id);

    const existingComment = await prisma.comment.findFirst({
      where: {
        blogId,
        userId: user.id,
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
        userId: user.id,
      },
    });

    return NextResponse.json({ status: true, data: newComment });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    }, { status: 400 });
  }
}
