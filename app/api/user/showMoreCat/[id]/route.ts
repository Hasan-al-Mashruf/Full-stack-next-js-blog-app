import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { userMiddleware } from "@/middlwere/userValidation/userValidation";
import { ICategory, IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const user = await userMiddleware();
    const blogId = params.id;
 
    const result = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
      select: {
        categories: true,
      },
    });

    const categories: any[] | null = result ? result?.categories : null;

    if (!categories) throw new Error("Categories not found");

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        followingCat: {
          // set is used to update with already exist
          connect: categories.map((category: ICategory) => ({
            id: category.id,
          })),
        },
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        status: false,
        message: (error as any).message ?? "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
