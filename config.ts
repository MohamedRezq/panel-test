import { GridColDef } from "@mui/x-data-grid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
//-----------------------------------------------------------------------//
//-----------------------------------------------------------------------//
export const APP_BASEURL = process.env.NEXTAUTH_URL;
export const API_BASEURL = process.env.NEXT_PUBLIC_API_BASEURL;
//-----------------------------------------------------------------------//
//-----------------------------------------------------------------------//
export const DASHBOARD_CONFIG = new Map([
  [
    "picker",
    {
      default_url: "/picker",
      title: "Picker Dashboard",
      icon: LocalShippingIcon,
      statusVisualization: new Map([
        [1, "warning"],
        [2, "warning"],
        [3, "warning"],
        [4, "secondary"],
        [5, "secondary"],
        [6, "success"],
        [7, "error"],
        [8, "error"],
        [9, "primary"],
      ]) as Map<
        number,
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning"
      >,
      timeslotVisualization: new Map([
        ["09:00 PM - 12:00 AM", "error"],
        ["06:00 PM - 09:00 PM", "success"],
        ["03:00 PM - 06:00 PM", "secondary"],
      ]) as Map<
        string,
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning"
      >,
    },
  ],
]);
