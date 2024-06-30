import { prisma } from "@/lib/db";
import { ICategory } from "@/types/types.global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories: ICategory[] | null = await prisma.category.findMany({});
    return NextResponse.json({ status: true, data: categories });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
