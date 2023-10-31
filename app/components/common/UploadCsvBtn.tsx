import React, { useRef } from "react";
import { Button } from "react-bootstrap";

interface FileConverterProps {
  onFileConverted: (data: any) => void;
}

const UploadCsvBtn: React.FC<FileConverterProps> = ({ onFileConverted }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const csvData = reader.result as string;
          const jsonData = convertCSVtoJSON(csvData);
          onFileConverted(jsonData);
        } catch (error) {
          console.error("Error converting CSV to JSON:", error);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please select a CSV file.");
    }
  };

  const convertCSVtoJSON = (csvData: string) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");

    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");

      if (row.length === headers.length) {
        const rowData: { [key: string]: string } = {};
        for (let j = 0; j < headers.length; j++) {
          rowData[headers[j]] = row[j];
        }
        data.push(rowData);
      }
    }

    return { headers, data };
  };

  return (
    <div>
      <Button
        key="import"
        style={{ backgroundColor: "green" }}
        onClick={() => fileInputRef.current?.click()}
      >
        CSV IMPORT
      </Button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadCsvBtn;
