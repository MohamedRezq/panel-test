import { API_BASEURL } from "@/config";
import httpServices from "@/utils/httpServices";

export const createItem = async (item: string, data: Object) => {
  try {
    const response = await httpServices.post(`${API_BASEURL}/${item}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any | null) {
    console.log(error);
  }
};
