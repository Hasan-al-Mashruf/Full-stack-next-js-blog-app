import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { IBlog, ICategory } from "@/types/types.global";
import { ZodError, z } from "zod";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  const schema = z.object({
    title: z.string().min(5),
    content: z.string(),
    categories: z.array(z.any()),
    featuredImg: z.string().url(),
  });

  try {
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User does not exist",
      });
    }

    const requestData = await req.json();
    const parsedData = schema.parse(requestData);
    console.log({ parsedData });
    const { title, content, featuredImg, categories } = parsedData;

    console.log({ title, content, featuredImg, categories });

    // Check if the blog already exists
    const existingBlog: IBlog | null = await prisma.blog.findUnique({
      where: { title },
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          status: false,
          message: "Blog already exists",
        },
        { status: 400 }
      );
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: false,
          message: "Validation Error",
        },
        { status: 400 }
      );
    } else {
      console.error("Error creating blog:", error);
      return NextResponse.json(
        {
          status: false,
          message: "Internal Server Error",
        },
        { status: 400 }
      );
    }
  }
}

export async function GET() {
  try {
    const blogs: IBlog[] | [] = await prisma.blog.findMany({
      include: {
        categories: true,
        user: true,
        like: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    console.log({ blogs }, "i am good");
    return NextResponse.json({ status: true, data: blogs });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
