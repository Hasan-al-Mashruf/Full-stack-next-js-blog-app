import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { IBlog, IComment, IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const blogId = params.id;
    const [comments, totalComments]: [IComment[] | null, number] =
      await prisma.$transaction([
        prisma.comment.findMany({
          where: {
            blogId,
          },
          include: {
            blog: true,
            user: true,
          },
        }),
        prisma.comment.count({
          where: {
            blogId,
          },
        }),
      ]);

    return NextResponse.json({
      status: true,
      data: comments,
      total: totalComments,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User does not exist",
      });
    }
    const id = params.id;
    const { content } = await req.json();

    // Check if the user already exists
    const existingBlog: IBlog | null = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({
        status: false,
        message: "Blog doesn't exist",
      });
    }

    const newComment: IComment | null = await prisma.comment.create({
      data: {
        content,
        blogId: existingBlog.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ status: true, data: newComment });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
