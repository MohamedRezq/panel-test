"use client";
import MainCalendar from "@/app/components/Data/MainCalendar";
import MainTable from "@/app/components/Data/MainTable";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const params = {
    tab: searchParams.get("tab") || "products",
    sort: searchParams.get("sort") || undefined,
    branch_id: searchParams.get("branch_id") || undefined,
    delivery_type: searchParams.get("delivery_type") || undefined,
    perPage: Number(searchParams.get("perPage")) || undefined,
    status: searchParams.get("status") || undefined,
  };

  return (
    <>
      {searchParams.get("tab") !== "timeslots" ? (
        <MainTable params={params} />
      ) : (
        <MainCalendar />
      )}
    </>
  );
}
