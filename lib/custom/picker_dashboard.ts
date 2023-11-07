import { API_BASEURL } from "@/config";
import httpServices from "@/utils/httpServices";

//--> Picker: Cancel Order
//--------------------------------------------------------------------//
export const pickerCancelOrder = async (id: string, auth: string) => {
  try {
    const response = await httpServices.patch(
      `${API_BASEURL}/orders/admin/${id}/cancel`,
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

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

//--> Picker: Re-schedule Order
//--------------------------------------------------------------------//
export const pickerRescheduleOrder = async (
  id: string,
  newDate: string,
  auth: string
) => {
  try {
    const response = await httpServices.patch(
      `${API_BASEURL}/orders/admin/${id}/reschedule`,
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

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//
//--> Picker: Deliver Order
//--------------------------------------------------------------------//
export const pickerDeliverOrder = async (id: string, auth: string) => {
  try {
    const response = await httpServices.patch(
      `${API_BASEURL}/orders/admin/${id}/deliver`,
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
