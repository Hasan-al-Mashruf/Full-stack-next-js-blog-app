import { prisma } from "../../../../lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { IUser } from "@/types/types.global";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password before storing it
    const hashedPassword = await hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user: IUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // exclude password from user...
    const { password: _, ...responseUser } = user;
    return NextResponse.json({ status: true, data: responseUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
