import { API_ENDPOINT } from "@/config";
import httpServices from "./httpServices";

export const isUserAuhtenticated = () => {
  if (sessionStorage.getItem("user") !== undefined)
    return sessionStorage.getItem("user");
  else return false;
};

export const loginUser = async (user: any) => {
  try {
    const response = await httpServices.post(
      `${API_ENDPOINT}/admin_users/login`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any | null) {
    console.log(error);
    return error.response;
  }
};
