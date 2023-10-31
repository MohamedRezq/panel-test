import { PANEL_ENDPOINT } from "@/config";
import { login } from "@/lib/auth";
import { AuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const user: User = await login(
            credentials.username,
            credentials.password
          );
          return user;
        } catch (e: any) {
          console.error("error: ", e);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: `/login?callbackUrl=${PANEL_ENDPOINT}/dashboard`,
    error: `/login?error=FAILED`,
    signOut: "/login",
  },

  callbacks: {
    jwt: async ({ user, token }) => {
      return { ...token, ...user };
    },
    session: async ({ token, session }) => {
      session.user = { ...token };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
