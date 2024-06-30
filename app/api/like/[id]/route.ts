import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ILike, IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const blogId = params.id;
    const [likes, totalLikes]: [ILike[] | null, number] =
      await prisma.$transaction([
        prisma.like.findMany({
          where: {
            blogId,
          },
          include: {
            blog: true,
            user: true,
          },
        }),
        prisma.like.count({
          where: {
            blogId,
          },
        }),
      ]);

    return NextResponse.json({
      status: true,
      data: likes,
      total: totalLikes,
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

    // Check if the user already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({
        status: false,
        message: "Blog doesn't exist",
      });
    }

    await prisma.like.create({
      data: {
        blogId: existingBlog.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
