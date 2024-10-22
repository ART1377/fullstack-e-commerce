import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/db/db";
import { comparePassword } from "@/app/lib/bcrypt";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const password = credentials.password as string;
        const email = credentials.email as string;

        let user = null;
        // logic to verify if the user exists
        user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !credentials?.password) return null;

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session && session.user) {
        const user = await db.user.findUnique({
          where: { email: session.user.email },
        });
        if (user) {
          session.user.firstName = user?.firstName;
          session.user.lastName = user?.lastName;
        }
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
