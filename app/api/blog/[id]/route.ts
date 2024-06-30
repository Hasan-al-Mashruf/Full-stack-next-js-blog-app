import { prisma } from "@/lib/db";
import { IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const id = params.id;
    const singleBlog = await prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        categories: true,
      },
    });

    if (!singleBlog) {
      return NextResponse.json({ status: false, message: "No blog found" });
    }

    return NextResponse.json({ status: true, data: singleBlog });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "something went wrong",
    });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const id = params?.id;
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ status: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "something went wrong",
    });
  }
}
