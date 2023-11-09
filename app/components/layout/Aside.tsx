"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import logo from "@/public/images/panda-logo.png";
import Link from "next/link";
import GridViewIcon from "@mui/icons-material/GridView";
import { Menu } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { VERSION_NUMBER } from "@/config";

export interface tabProps {
  text: string;
  url: string;
  icon?: React.ReactNode;
  params?: Object;
}
export const tabs: tabProps[] = [
  // {
  //   text: "Request Services",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />,
  // },
  // {
  //   text: "User",
  //   url: "/dashboard?tab=users",
  //   icon: <FaUsers />,
  // },
  // {
  //   text: "Balance Score Card Targets",
  //   url: "/dashboard?tab=",
  //   icon: <MdOutlineAccountBalance />,
  // },
  // {
  //   text: "Balance Score Card Targets\nTypes",
  //   url: "/dashboard?tab=",
  //   icon: <MdOutlineAccountBalance />,
  // },
  // {
  //   text: "Social Identities",
  //   url: "/dashboard?tab=",
  //   icon: <TbSocial />,
  // },
  // {
  //   text: "Expirable Credits",
  //   url: "/dashboard?tab=",
  //   icon: <RiPassExpiredLine />,
  // },
  // {
  //   text: "Credits",
  //   url: "/dashboard?tab=",
  //   icon: <MdOutlineCreditScore />,
  // },
  // {
  //   text: "Credits Types",
  //   url: "/dashboard?tab=",
  //   icon: <MdOutlineCreditScore />,
  // },
  // {
  //   text: "Credits Requests",
  //   url: "/dashboard?tab=credits",
  //   params: {
  //     page: 1,
  //   },
  //   icon: <MdOutlineCreditScore />,
  // },
  // {
  //   text: "Brands",
  //   url: "/dashboard?tab=",
  //   icon: <MdBrandingWatermark />,
  // },
  // {
  //   text: "Categories",
  //   url: "/dashboard?tab=categories",
  //   icon: <BiCategoryAlt />,
  // },
  // {
  //   text: "Products",
  //   url: "/dashboard?tab=products&page=1&sort=relevance&perPage=15",
  //   params: {
  //     page: 1,
  //     sort: "relevance",
  //     perPage: 15,
  //   },
  //   icon: <MdOutlineSell />,
  // },
  // {
  //   text: "Varieties",
  //   url: "/dashboard?tab=",
  //   icon: <MdOutlineAccountBalance />, // Update the icon to a relevant one
  // },
  {
    text: "Picker Dashboard",
    url: "/dashboard/picker",
    icon: <GridViewIcon />, // Update the icon to a relevant one
  },
  // {
  //   text: "Requested Products",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "Deliveries",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "Branches",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "Retailers",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "Cities",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "Order Actions",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "Open Carts",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "User lists",
  //   url: "/dashboard?tab=",
  //   icon: <AiOutlinePullRequest />, // Update the icon to a relevant one
  // },
  // {
  //   text: "Timeslots",
  //   url: "/dashboard?tab=timeslots&branch_id=2&delivery_type=home_delivery",
  //   icon: <></>, // Update the icon to a relevant one
  // },
];

interface AsideProps {}

const Aside: FC<AsideProps> = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(tabs?.at(0)?.text);
  return (
    <Box
      component="aside"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      className="aside"
    >
      <Box width={"100%"} sx={{ overflowY: "hidden" }}>
        {tabs.map((tab: tabProps, index: number) => (
          <Box
            onClick={() => {
              setSelectedTab(tab.text);
              router.push(tab.url);
            }}
            sx={{ cursor: "pointer" }}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
            paddingY={1}
            paddingX={2}
            className={`main-link px-2 active collapsed d-flex gap-2 align-items-center p-2 ${
              selectedTab == tab.text && "selected-tab"
            }`}
            key={`aside-tab-${index}-${tab.text}`}
          >
            {tab.icon ?? <Menu />}
            {tab.text}
          </Box>
        ))}
      </Box>
      <Typography fontSize={12} color="gray">
        Version {VERSION_NUMBER}
      </Typography>
    </Box>
  );
};

export default Aside;
