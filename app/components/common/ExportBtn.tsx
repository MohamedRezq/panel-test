import { Button } from "@mui/material";
import exportFromJSON, { ExportType } from "export-from-json";
import IosShareIcon from "@mui/icons-material/IosShare";
import React from "react";

interface IExportFileProps {
  fileName: string;
  data: string | object;
  exportType?: ExportType;
}

const ExportBtn = (props: IExportFileProps) => {
  return (
    <Button
      key="import"
      onClick={() =>
        exportFromJSON({
          data: props.data,
          fileName: props.fileName,
          exportType: props?.exportType ?? "csv",
        })
      }
      sx={{
        marginRight: "15px",
        marginLeft: "15px",
      }}
      variant="contained"
      color="info"
      endIcon={<IosShareIcon />}
    >
      Export
    </Button>
  );
};

export default ExportBtn;
