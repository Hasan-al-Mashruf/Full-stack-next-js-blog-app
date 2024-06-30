import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { IParams } from "@/types/types.global";
import { NextResponse } from "next/server";

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
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({
        status: false,
        message: "user doesn't exist",
      });
    }

    await prisma.report.create({
      data: {
        reporterId: existingUser.id,
        reportedId: "cly0d4p2s000010iiemhdoe8v",
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
