"use client";
import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "@/public/images/panda-logo.png";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface Attribute {
  label: string;
  type: "text" | "password" | "date";
}

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  type: "confirmation" | "form" | "content";
  question?: string;
  attributes?: Attribute[];
  onConfirm?: () => void;
  onSubmit?: (formData: Record<string, string>) => void;
  handleParentParameter?: Function;
  content?: ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  type,
  question,
  attributes,
  onConfirm,
  onSubmit,
  handleParentParameter,
  content,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      const formDataObject: Record<string, string> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value.toString();
      });
      onSubmit(formDataObject);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={type == "content" ? "md" : "xs"}
      fullWidth
    >
      <DialogContent>
        {type === "confirmation" && (
          <>
            <Image
              src={logo}
              alt="Panda"
              width={50}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                margin: "15px",
              }}
            />
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body1">{question}</Typography>
              <Box display="flex" gap={1}>
                <Button
                  onClick={() => handleConfirm()}
                  variant="contained"
                  color="success"
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </>
        )}
        {type === "form" && (
          <>
            <Image
              src={logo}
              alt="Panda"
              width={50}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                margin: "15px",
              }}
            />
            <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
              {attributes?.map(({ label, type }) => (
                <>
                  {type == "date" ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DateTimePicker", "DateTimePicker"]}
                      >
                        <DateTimePicker
                          label={label}
                          value={value}
                          views={[
                            "year",
                            "month",
                            "day",
                            "hours",
                            "minutes",
                            "seconds",
                          ]}
                          onChange={(newValue: any) => {
                            setValue(newValue);
                            if (handleParentParameter) {
                              handleParentParameter(newValue);
                            }
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  ) : (
                    <FormControl key={label} fullWidth margin="normal">
                      <InputLabel>{label}</InputLabel>
                      <TextField
                        type={type}
                        name={label.toLowerCase()}
                        fullWidth
                      />
                    </FormControl>
                  )}
                </>
              ))}
              <DialogActions>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleConfirm()}
                  variant="contained"
                  color="success"
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </>
        )}
        {type === "content" && (
          <Stack
            // sx={{ boxSizing: "border-box" }}
            direction="column"
            width={"100%"}
          >
            <Image
              src={logo}
              alt="Panda"
              width={50}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                margin: "15px",
              }}
            />
            {content}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
