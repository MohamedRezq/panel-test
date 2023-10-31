import Image from "next/image";
import React, { FC } from "react";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { TfiMenuAlt } from "react-icons/tfi";
import { tabProps, tabs } from "@/config.tables";

interface AsideProps {}

const Aside: FC<AsideProps> = () => {
  return (
    <aside className="aside d-flex flex-column gap-3 bg-white">
      <div className="aside-logo-container border-bottom border-bottom-1 d-flex align-items-center justify-content-center py-3">
        <Image width={100} src={logo} alt="Panda" />
      </div>
      <div className="aside-tabs d-flex flex-column gap-2 h-100 px-2 pb-4">
        {tabs.map((tab: tabProps, index: number) => (
          <Link
            href={tab.url}
            className="main-link active collapsed d-flex gap-2 border border-1 rounded-2 align-items-center p-2"
            style={{ color: "#000", fontSize: "10pt" }}
            key={`aside-tab-${index}-${tab.text}`}
          >
            {tab.icon ?? <TfiMenuAlt size={15} />}
            {tab.text}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Aside;
