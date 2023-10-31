import NextAuth from "next-auth";

declare module "next-auth" {
  type User = {
    id: number;
    email: string;
    mobile?: string;
    name: string;
    permissions?: string[];
    branches?: number[];
    key?: any;
  };
}
