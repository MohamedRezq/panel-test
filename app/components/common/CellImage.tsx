import Image from "next/image";
import React, { ReactNode } from "react";
import temp from "@/public/images/temp.png";

interface ICellImage {
  url?: string;
  alt?: string;
  size?: number;
  replacement?: ReactNode;
}

const CellImage = (props: ICellImage) => {
  return (
    <>
      {props.url?.includes(".png") || props.url?.includes(".jpg") ? (
        <Image
          width={props.size}
          height={props.size}
          src={props.url}
          alt={props.alt || "Panda"}
        />
      ) : (
        <Image
          width={Number(props.size) - 14}
          height={Number(props.size) - 14}
          src={temp}
          alt={props.alt || "Panda"}
        />
      )}
    </>
  );
};

export default CellImage;
