import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { IBlog, ICategory, IUser } from "@/types/types.global";
import { blogInputValidate } from "@/zod/validation/zodValidation";
import { userMiddleware } from "@/middlwere/userValidation/userValidation";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req: NextRequest) {
  const { id: userId } = (await userMiddleware()) as IUser;
  try {
    const requestData = await req.json();
    const parsedData = blogInputValidate(requestData);
    const { title, content, featuredImg, categories } = parsedData;

    // Check if the blog already exists
    const existingBlog: IBlog | null = await prisma.blog.findUnique({
      where: { title },
    });

    if (existingBlog) throw new Error("Blog already exists");

    const newBlog: IBlog | null = await prisma.blog.create({
      data: {
        title,
        content,
        featuredImg,
        categories: {
          connect: categories?.map((category: ICategory) => ({
            id: category.id,
          })),
        },
        userId,
      },
    });

    return NextResponse.json({ status: true, data: newBlog });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: (error as any).message ?? "Internal Server Error",
      },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  const url = new URL(req.url);

  try {
    const searchQuery = url.searchParams.get("searchQuery");
    const page = parseInt(url.searchParams.get("page") ?? "1");
    console.log({ page, searchQuery });
    const take = 5;
    const skip = (page - 1) * take;
    const [blogs, totalBlogs] = await prisma.$transaction([
      prisma.blog.findMany({
        where: {
          OR: searchQuery
            ? [
                // contains in prisma is used to match partial
                { title: { contains: searchQuery } },
                { content: { contains: searchQuery } },
              ]
            : undefined,
          user: {
            id: {
              //  user will not get blog form any user whom he reported
              notIn: user?.reporter.map((reporter) => reporter.reportedId),
            },
          },
        },
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
        skip,
        take,
      }),
      prisma.blog.count({
        where: {
          OR: searchQuery
            ? [
                // contains in prisma is used to match partial
                { title: { contains: searchQuery } },
                { content: { contains: searchQuery } },
              ]
            : undefined,
          user: {
            id: {
              //  user will not get blog form any user whom he reported
              notIn: user?.reporter.map((reporter) => reporter.reportedId),
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      status: true,
      data: blogs,
      meta: { total: Math.ceil(totalBlogs / take), currentPage: page },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
