import React from "react";

interface IColorPalette {
  color: string;
  size?: number;
}
const ColorPalette = (props: IColorPalette) => {
  return (
    <div className="d-flex align-items-center gap-1">
      <div
        style={{
          width: props.size,
          height: props.size,
          backgroundColor: props.color,
        }}
        className=" rounded-circle"
      ></div>
      <div style={{ fontSize: "8pt" }}>{props.color}</div>
    </div>
  );
};

export default ColorPalette;
