import NextAuth from "next-auth";

export interface IUserKey {
  auth_key: string;
  refresh_key: string;
}

export interface IUser {
  id: number;
  email: string;
  mobile?: string;
  name: string;
  permissions?: string[];
  branches?: number[];
  key?: IUserKey;
}

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
