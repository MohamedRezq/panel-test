import exportFromJSON, { ExportType } from "export-from-json";
import React from "react";
import { Button } from "react-bootstrap";
import { BiExport } from "react-icons/bi";

interface IExportFileProps {
  fileName: string;
  data: string | object;
  exportType?: ExportType;
}

const ExportCsvBtn = (props: IExportFileProps) => {
  return (
    <Button
      key="import"
      style={{ backgroundColor: "green" }}
      onClick={() =>
        exportFromJSON({
          data: props.data,
          fileName: props.fileName,
          exportType: props?.exportType ?? "csv",
        })
      }
      className="d-flex gap-2 align-items-center"
    >
      <div>EXPORT</div>
      <BiExport size={18} />
    </Button>
  );
};

export default ExportCsvBtn;
