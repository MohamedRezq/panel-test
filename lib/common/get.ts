import { API_BASEURL } from "@/config";
import httpServices from "@/utils/httpServices";

export const getItems = async (
  params?: any,
  extraAttributes?: string,
  auth?: string
) => {
  try {
    //----------------------------------------------------//
    const query = Object.entries(params).filter(
      ([key, value]) => key !== "tab"
    );
    //----------------------------------------------------//
    const queryString = query
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    //----------------------------------------------------//
    const endPointUrl = extraAttributes
      ? `${API_BASEURL}${extraAttributes}`
      : `${API_BASEURL}/${params?.tab}`;
    //----------------------------------------------------//
    const headersObj = auth
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        }
      : {
          "Content-Type": "application/json",
        };
    //----------------------------------------------------//
    //----------------------------------------------------//
    const response = await httpServices.get(
      `${endPointUrl}${query.length == 0 ? "" : `?${queryString}`}`,
      {
        headers: headersObj,
      }
    );
    //----------------------------------------------------//
    return response;
  } catch (error: any | null) {
    console.log(error);
  }
};
