import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { IBlog, ICategory } from "@/types/types.global";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User does not exist",
      });
    }

    const { title, content, featuredImg, categories } = await req.json();

    // Check if the user already exists
    const existingBlog: IBlog | null = await prisma.blog.findUnique({
      where: { title },
    });

    if (existingBlog) {
      return NextResponse.json({
        status: false,
        message: "Blog already exists",
      });
    }

    const newBlog: IBlog | null = await prisma.blog.create({
      data: {
        title,
        content,
        featuredImg,
        categories: {
          connect: categories?.map((category: ICategory) => category),
        },
        userId: user.id,
      },
    });

    return NextResponse.json({ status: true, data: newBlog });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

export async function GET() {
  try {
    const blogs: IBlog[] = await prisma.blog.findMany({
      include: {
        categories: true,
        user: true,
      },
    });
    console.log(blogs);
    return NextResponse.json({ status: true, data: blogs });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
