import { API_BASEURL } from "@/config";
import httpServices from "@/utils/httpServices";

export const deleteItem = async (item: string, id: string) => {
  try {
    const response = await httpServices.delete(`${API_BASEURL}/${item}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any | null) {
    console.log(error);
  }
};
