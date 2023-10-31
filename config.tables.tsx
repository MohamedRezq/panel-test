"use client";
import CellImage from "./app/components/common/CellImage";
import ColorPalette from "./app/components/common/ColorPalette";
import RowActions from "./app/components/common/RowActions";
import RowActionsOrders from "./app/components/common/RowActionsOrders";
//-- Icons ----------------------------------------------------------//
import { AiOutlinePullRequest } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import {
  MdOutlineAccountBalance,
  MdOutlineCreditScore,
  MdBrandingWatermark,
  MdOutlineSell,
} from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import { RiPassExpiredLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
//-------------------------------------------------------------------//

const tables_attributes = new Map([
  [
    "categories",
    {
      table_columns: [
        {
          name: "",
          selector: (row: any) => <RowActions item={JSON.stringify(row)} />,
        },
        {
          name: "id",
          selector: (row: any) => row.id,
        },
        {
          name: "name",
          selector: (row: any) => row.name,
        },
        {
          name: "name_en",
          selector: (row: any) => row.name_en,
        },
        {
          name: "name_ar",
          selector: (row: any) => row.name_ar,
        },
        {
          name: "color",
          selector: (row: any) => <ColorPalette color={row?.color} size={20} />,
        },
        {
          name: "image_url",
          selector: (row: any) => (
            <CellImage url={row?.image_url} alt={row?.name_en} size={45} />
          ),
        },
        {
          name: "image_url_selected",
          selector: (row: any) => (
            <CellImage
              url={row?.image_url_selected}
              alt={row?.name_en}
              size={45}
            />
          ),
        },
        {
          name: "image_path",
          selector: (row: any) => (
            <CellImage url={row?.image_path} alt={row?.name_en} size={45} />
          ),
        },
        {
          name: "grid_image_path",
          selector: (row: any) => (
            <CellImage
              url={row?.grid_image_path}
              alt={row?.name_en}
              size={45}
            />
          ),
        },
        {
          name: "collection_image_path",
          selector: (row: any) => (
            <CellImage
              url={row?.collection_image_path}
              alt={row?.name_en}
              size={45}
            />
          ),
        },
        {
          name: "pattern_type",
          selector: (row: any) => row.pattern_type,
        },
        {
          name: "cta_action",
          selector: (row: any) => row.cta_action,
        },
        {
          name: "has_subcategory",
          selector: (row: any) => row.has_subcategory,
        },
      ],
      create_attributes: [
        {
          attr_name: "parent_id",
          attr_type: "number",
          attr_req: true,
          attr_placeholder: 206,
        },
        {
          attr_name: "name_en",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "hello en",
        },
        {
          attr_name: "name_ar",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "hello ar",
        },
        {
          attr_name: "category_order",
          attr_type: "number",
          attr_req: true,
          attr_placeholder: 333,
        },
        {
          attr_name: "shopping_order",
          attr_type: "number",
          attr_req: true,
          attr_placeholder: 333,
        },
        {
          attr_name: "color",
          attr_type: "color",
          attr_req: true,
          attr_placeholder: "#123456",
        },
        {
          attr_name: "image_url",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "",
        },
        {
          attr_name: "image_url",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "",
        },
        {
          attr_name: "image_path",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "",
        },
        {
          attr_name: "collection_image_path",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "",
        },
        {
          attr_name: "grid_image_path",
          attr_type: "number",
          attr_req: true,
          attr_placeholder: 206,
        },
      ],
      edit_attributes: [
        {
          attr_name: "name_en",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "hello en",
        },
        {
          attr_name: "name_ar",
          attr_type: "string",
          attr_req: true,
          attr_placeholder: "hello ar",
        },
        {
          attr_name: "category_order",
          attr_type: "number",
          attr_req: true,
          attr_placeholder: 333,
        },
      ],
    },
  ],
  [
    "products",
    {
      table_columns: [
        {
          name: "",
          selector: (row: any) => <RowActions item={JSON.stringify(row)} />,
        },
        {
          name: "id",
          selector: (row: any) => row.id,
        },
        {
          name: "brand_id",
          selector: (row: any) => row.brand_id,
        },
        {
          name: "category_id",
          selector: (row: any) => row.category_id,
        },
        {
          name: "rank",
          selector: (row: any) => row.rank,
        },
        {
          name: "name",
          selector: (row: any) => row.name,
        },
        {
          name: "filter",
          selector: (row: any) => row.filter,
        },
        {
          name: "selected",
          selector: (row: any) => row.selected,
        },
        {
          name: "brand",
          selector: (row: any) => row?.brand?.name,
        },
        {
          name: "category",
          selector: (row: any) => row?.category?.name,
        },
      ],
      rowsPerPage: 15,
      create_attributes: null,
      edit_attributes: null,
    },
  ],
  [
    "timeslots",
    {
      table_columns: [],
      create_attributes: [],
      edit_attributes: [],
    },
  ],
  [
    "orders",
    {
      table_columns: [
        {
          name: "",
          selector: (row: any) => <RowActionsOrders orderId={row?.hashed_id} />,
        },
        {
          name: "timeslot",
          selector: (row: any) => row?.timeslot,
        },
        {
          name: "hashed_id",
          selector: (row: any) => row?.hashed_id,
        },
        {
          name: "created_at",
          selector: (row: any) => row?.created_at,
        },
        {
          name: "customer_id",
          selector: (row: any) => row?.customer_id,
        },
        {
          name: "customer_name",
          selector: (row: any) =>
            `${row?.user?.firstname} ${row?.user?.lastname}`,
        },
        {
          name: "total_amount",
          selector: (row: any) => row?.pricing?.grand_total?.amount,
        },
        {
          name: "retail_price",
          selector: (row: any) => row?.pricing?.items?.at(0)?.amount,
        },
        {
          name: "delivery_price",
          selector: (row: any) => row?.pricing?.items?.at(1)?.amount,
        },
        {
          name: "payment_status",
          selector: (row: any) => row?.payment_status,
        },
        {
          name: "payment_status_color",
          selector: (row: any) => (
            <ColorPalette color={row?.payment_status_color} />
          ),
        },
        {
          name: "cancelable",
          selector: (row: any) => row?.cancelable,
        },
        {
          name: "vat",
          selector: (row: any) => row?.vat,
        },
        {
          name: "payment_method_name",
          selector: (row: any) => row?.payment_method_name,
        },
        {
          name: "delivery_ts_from_time",
          selector: (row: any) => row?.delivery?.ts_from_time,
        },
        {
          name: "delivery_ts_to_time",
          selector: (row: any) => row?.delivery?.ts_to_time,
        },
        {
          name: "branch_id",
          selector: (row: any) => row?.delivery?.branch?.id,
        },
        {
          name: "branch_name",
          selector: (row: any) => row?.delivery?.branch?.name,
        },
        {
          name: "branch_city",
          selector: (row: any) => row?.delivery?.branch?.city,
        },
        {
          name: "retailer_branch_refrence",
          selector: (row: any) =>
            row?.delivery?.branch?.retailer_branch_refrence,
        },
        {
          name: "rms_store",
          selector: (row: any) => row?.delivery?.branch?.rms_store,
        },
        {
          name: "address",
          selector: (row: any) => row?.address?.formatted_address,
        },
        {
          name: "delivery_type_text",
          selector: (row: any) => row?.delivery?.delivery_type_text,
        },
      ],
    },
  ],
]);

export interface tabProps {
  text: string;
  url: string;
  icon?: React.ReactNode;
  params?: Object;
}
export const tabs: tabProps[] = [
  {
    text: "Request Services",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />,
  },
  {
    text: "User",
    url: "/dashboard?tab=users",
    icon: <FaUsers />,
  },
  {
    text: "Balance Score Card Targets",
    url: "/dashboard?tab=",
    icon: <MdOutlineAccountBalance />,
  },
  {
    text: "Balance Score Card Targets\nTypes",
    url: "/dashboard?tab=",
    icon: <MdOutlineAccountBalance />,
  },
  {
    text: "Social Identities",
    url: "/dashboard?tab=",
    icon: <TbSocial />,
  },
  {
    text: "Expirable Credits",
    url: "/dashboard?tab=",
    icon: <RiPassExpiredLine />,
  },
  {
    text: "Credits",
    url: "/dashboard?tab=",
    icon: <MdOutlineCreditScore />,
  },
  {
    text: "Credits Types",
    url: "/dashboard?tab=",
    icon: <MdOutlineCreditScore />,
  },
  {
    text: "Credits Requests",
    url: "/dashboard?tab=credits",
    params: {
      page: 1,
    },
    icon: <MdOutlineCreditScore />,
  },
  {
    text: "Brands",
    url: "/dashboard?tab=",
    icon: <MdBrandingWatermark />,
  },
  {
    text: "Categories",
    url: "/dashboard?tab=categories",
    icon: <BiCategoryAlt />,
  },
  {
    text: "Products",
    url: "/dashboard?tab=products&page=1&sort=relevance&perPage=15",
    params: {
      page: 1,
      sort: "relevance",
      perPage: 15,
    },
    icon: <MdOutlineSell />,
  },
  {
    text: "Varieties",
    url: "/dashboard?tab=",
    icon: <MdOutlineAccountBalance />, // Update the icon to a relevant one
  },
  {
    text: "Orders",
    url: "/dashboard?tab=orders",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Requested Products",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Deliveries",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Branches",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Retailers",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Cities",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Order Actions",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Open Carts",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "User lists",
    url: "/dashboard?tab=",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
  {
    text: "Timeslots",
    url: "/dashboard?tab=timeslots&branch_id=2&delivery_type=home_delivery",
    icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  },
];

export default tables_attributes;
