import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const IconWrapper = ({
  text,
  icon,
}: {
  text: string;
  icon: React.ReactNode;
}) => {
  const renderTooltip = () => <Tooltip id="tooltip">{text}</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <div
        style={{
          display: "inline-block",
          cursor: "pointer",
          padding: "5px",
          borderRadius: "50%",
          backgroundColor: "lightgray",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e: any) => {
          e.target.style.backgroundColor = "darkgray";
        }}
        onMouseLeave={(e: any) => {
          e.target.style.backgroundColor = "lightgray";
        }}
      >
        {icon}
      </div>
    </OverlayTrigger>
  );
};

export default IconWrapper;
