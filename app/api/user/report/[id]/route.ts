import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { userMiddleware } from "@/middlwere/userValidation/userValidation";
import { IParams, IUser } from "@/types/types.global";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: IParams }) {
  try {
    console.log({ params });
    const { id } = (await userMiddleware()) as IUser;
    const reportedUserId = params?.id;

    const existingReport = await prisma.report.findUnique({
      where: {
        // this is a compund key
        reporterId_reportedId: {
          reporterId: id,
          reportedId: reportedUserId,
        },
      },
    });

    if (existingReport) throw new Error("You have already reported him");

    const transactionTasks: any[] = [
      prisma.report.create({
        data: {
          reporterId: id,
          reportedId: reportedUserId,
        },
      }),
    ];
    // Check if a follow relationship exists
    const followRelation = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: reportedUserId,
          followingId: id,
        },
      },
    });
    // if user reports a following user the the reportd will be unfoloed and reported
    if (followRelation) {
      const unfollowUser = prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: reportedUserId,
            followingId: id,
          },
        },
      });
      transactionTasks.push(unfollowUser);
    }

    await prisma.$transaction(transactionTasks);
    return NextResponse.json({ status: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: (error as any).message ?? "Internal Server Error",
      },
      { status: 400 }
    );
  }
}
