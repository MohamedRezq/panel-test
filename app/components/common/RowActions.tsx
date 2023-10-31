"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Fill } from "react-icons/ri";

interface IRowActions {
  item: string;
}

const RowActions = (props: IRowActions) => {
  const router = useRouter();
  return (
    <div className="d-flex gap-3 align-items-center">
      <FiEdit
        className="text-info"
        size={18}
        onClick={() => {
          router.push(
            `/dashboard/action/edit?item=category&old=${encodeURIComponent(
              props.item
            )}`
          );
        }}
      />
      <RiDeleteBin7Fill className="text-warning" size={20} onClick={() => {}} />
    </div>
  );
};

export default RowActions;
