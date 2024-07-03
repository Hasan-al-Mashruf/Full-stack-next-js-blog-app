import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { IUser } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  try {
    const suggstedUsers = await prisma.user.findMany({
      include: {
        followingCat: true,
      },
      where: {
        followingCat: {
          some: {
            id: {
              in: user?.followingCat.map((category) => category.id),
            },
          },
        },
      },
    });
    return NextResponse.json({ status: true, data: [] });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
