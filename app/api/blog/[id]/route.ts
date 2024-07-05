import { prisma } from "@/lib/db";
import { IParams } from "@/types/types.global";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: IParams }) {
  try {
    const id = params.id;
    const singleBlog = await prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        categories: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!singleBlog) throw new Error("No blog found");

    return NextResponse.json({ status: true, data: singleBlog });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong",
      },
      { status: 400 }
    );
  }
}
