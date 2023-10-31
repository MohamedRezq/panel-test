import { API_ENDPOINT } from "@/config";
import httpServices from "./httpServices";

export const getItems = async (
  params?: any,
  extraAttributes?: string,
  auth?: string
) => {
  try {
    console.log("got params: ", params);
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
      ? `${API_ENDPOINT}${extraAttributes}`
      : `${API_ENDPOINT}/${params?.tab}`;
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

export const createItem = async (item: string, data: Object) => {
  try {
    const response = await httpServices.post(`${API_ENDPOINT}/${item}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any | null) {
    console.log(error);
  }
};

export const updateItem = async (item: string, id: string, data: Object) => {
  try {
    const response = await httpServices.patch(
      `${API_ENDPOINT}/${item}/${id}`,
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

export const deleteItem = async (item: string, id: string) => {
  try {
    const response = await httpServices.delete(
      `${API_ENDPOINT}/${item}/${id}`,
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

export const createDynamicObject = (keys: any, values: any) => {
  const object: any = {};
  for (let i = 0; i < keys.length; i++) {
    object[keys[i]] = values[i];
  }
  return object;
};

//-- Orders --------------------------------------------------------------------//
//------------------------------------------------------------------------------//
export const cancelOrder = async (id: string, auth: string) => {
  try {
    const response = await httpServices.patch(
      `${API_ENDPOINT}/orders/picker_order/${id}/cancel`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );
    return response;
  } catch (error: any | null) {
    console.log(error);
  }
};

export const rescheduleOrder = async (
  id: string,
  newDate: string,
  auth: string
) => {
  try {
    const response = await httpServices.patch(
      `${API_ENDPOINT}/orders/picker_order/${id}/reschedule`,
      {
        delivery_start_time: `${newDate}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );
    return response;
  } catch (error: any | null) {
    console.log(error);
  }
};
