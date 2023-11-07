import { API_BASEURL } from "@/config";
import httpServices from "@/utils/httpServices";

export const updateItem = async (item: string, id: string, data: Object) => {
  try {
    const response = await httpServices.patch(
      `${API_BASEURL}/${item}/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any | null) {
    console.log(error);
  }
};
