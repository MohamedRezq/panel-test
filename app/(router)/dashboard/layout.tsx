"use client";
import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import { Box } from "@mui/material";
import Aside from "@/app/components/layout/Aside";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/app/components/common/Loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [loading, setLoading] = useState(true);
  //--------------------------------------------------//
  useEffect(() => {
    setLoading(true);
    if (!session) redirect("/login");
    setLoading(false);
  }, [session]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main>
          <Header toggleSidebar={toggleSidebar} />
          <Box display="flex">
            {isSidebarOpen && <Aside />}
            <Box
              sx={{
                height: "100%",
                width: `${isSidebarOpen ? "80%" : "100%"}`,
              }}
            >
              {children}
            </Box>
          </Box>
        </main>
      )}
    </>
  );
}
