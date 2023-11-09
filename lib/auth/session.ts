import { API_BASEURL } from "@/config";
import httpServices from "@/utils/httpServices";
import { IUserKey } from "./types";

type RefreshSessionFn = (refreshToken: string) => Promise<IUserKey>;

export const refreshSession: RefreshSessionFn = async (refreshToken) => {
  try {
    const response = await httpServices.get(
      `${API_BASEURL}/admin_users/token/refresh`,
      {
        headers: {
          "X-Refresh-Key": refreshToken,
          "X-Language": "en",
          "X-Panda-Source": "PandaClick",
          "X-PandaClick-Agent": "6",
        },
      }
    );
    return response?.data?.data?.user?.key;
  } catch (error: any | null) {
    console.log("error: ", error);
    return null;
  }
};
