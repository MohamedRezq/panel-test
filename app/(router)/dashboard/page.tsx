"use client";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { redirect } from "next/navigation";
import Image from "next/image";
import logo from "@/public/images/panda-icon.png";

const DashboardPage = () => {
  useEffect(() => {
    redirect("/dashboard/picker");
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      gap={3}
      sx={{ width: "100%", height: "100%" }}
    >
      <Box fontSize={14}>Welcome to Panda Dashboard</Box>
      <Image src={logo} alt="Panda" />
    </Box>
  );
};

export default DashboardPage;
