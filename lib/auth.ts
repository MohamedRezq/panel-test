import { API_ENDPOINT, PANEL_ENDPOINT } from "@/config";
import httpServices from "@/utils/httpServices";
import { AuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
type LoginFn = (username: string, password: string) => Promise<User>;

export const login: LoginFn = async (username, password) => {
  const userData = {
    user: {
      username,
      password,
      device_info: {
        device_id: "jhagsd71186e-12j86-12s34153",
      },
    },
  };
  try {
    const response = await httpServices.post(
      `${API_ENDPOINT}/admin_users/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any | null) {
    console.log("error: ", error);
    return null;
  }
};

export const authOptions: AuthOptions = {
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
