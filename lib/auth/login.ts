import { User } from "next-auth";
import { API_BASEURL } from "@/config";
import httpServices from "@/utils/httpServices";

type LoginFn = (username: string, password: string) => Promise<User>;

export const login: LoginFn = async (username, password) => {
  const userData = {
    user: {
      username,
      password,
      device_info: {
        //TODO Change this device_id
        device_id: "jhagsd71186e-12j86-12s34153",
      },
    },
  };
  try {
    const response = await httpServices.post(
      `${API_BASEURL}/admin_users/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("api login res: ", response);
    return response.data;
  } catch (error: any | null) {
    console.log("error: ", error);
    return null;
  }
};
