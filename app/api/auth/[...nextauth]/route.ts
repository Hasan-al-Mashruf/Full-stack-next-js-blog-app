import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/db";
import { compare } from "bcrypt";
import { IUser } from "@/types/types.global";
interface ICredential {
  email: string;
  password: string;
}
const handler = NextAuth({
  // prisma adapter
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as ICredential;

        const existingUser: IUser | null = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!existingUser || !existingUser.password) {
          throw new Error("No user found with the provided email");
        }

        //compare(plainpassword, hasedpassword);
        const isPasswordMatched = compare(password, existingUser?.password);

        if (!isPasswordMatched) {
          throw new Error("Incorrect password");
        }
        return existingUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
