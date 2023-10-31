import { User } from "next-auth";
import { API_ENDPOINT } from "@/config";
import httpServices from "@/utils/httpServices";
// import prisma from "./prisma";

// import { compare } from "bcrypt";

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
