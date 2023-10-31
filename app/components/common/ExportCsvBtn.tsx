import exportFromJSON, { ExportType } from "export-from-json";
import React from "react";
import { Button } from "react-bootstrap";

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
    >
      EXPORT
    </Button>
  );
};

export default ExportCsvBtn;
