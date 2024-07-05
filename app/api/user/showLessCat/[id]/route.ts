import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { userMiddleware } from "@/middlwere/userValidation/userValidation";
import { ICategory, IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const { id } = await userMiddleware();
    const blogId = params.id;

    const result = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
      select: {
        categories: true,
      },
    });

    const categories: ICategory[] | null = result ? result.categories : null;

    if (!categories) return;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        followingCat: {
          // disconnect is used to remove some favorite categories from the favorite categories array
          disconnect: categories.map((category: ICategory) => ({
            id: category.id,
          })),
        },
      },
    });
    return NextResponse.json({ status: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: (error as any)?.message ?? "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
