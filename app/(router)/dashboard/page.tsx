"use client";
import MainCalendar from "@/app/components/Data/MainCalendar";
import MainTable from "@/app/components/Data/MainTable";

export default function Home({ searchParams }: any) {
  return (
    <>
      {searchParams.tab !== "timeslots" ? (
        <MainTable params={searchParams} />
      ) : (
        <MainCalendar />
      )}
    </>
  );
}
