"use client";
import Header from "@/app/components/Header/Header";
import Aside from "@/app/components/Aside/Aside";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/app/components/common/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);
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
        <>
          {!expanded && <Aside />}
          <main className={`main-content h-50 ${expanded ? "w-100" : " w-75"}`}>
            <Header
              setExpanded={setExpanded}
              expanded={expanded}
              session={session}
            />
            <div className="w-100 p-2">{children}</div>
          </main>
        </>
      )}
    </>
  );
}
