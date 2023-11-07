"use client";
import { alpha, styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowClassNameParams,
  gridClasses,
} from "@mui/x-data-grid";
import UpdateIcon from "@mui/icons-material/Update";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSession } from "next-auth/react";
import { getItems } from "@/lib/common/get";
import moment from "moment";
import GenericModal from "@/app/components/common/GenericModal";
import {
  pickerCancelOrder,
  pickerDeliverOrder,
  pickerRescheduleOrder,
} from "@/lib/custom/picker_dashboard";
import { DASHBOARD_CONFIG } from "@/config";
import ExportBtn from "@/app/components/common/ExportBtn";
import { uncapitalizeObjectKeys } from "@mui/x-data-grid/internals";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/common/Loader";
import GenericSnackbar from "@/app/components/common/GenericSnackbar";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const PickerPage = () => {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [targetOrder, setTargetOrder] = useState<string>("");
  const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false);
  const [openDeliverOrderModal, setOpenDeliverOrderModal] = useState(false);
  const [visibleRows, setVisibleRows] = useState<any[]>([]);
  const [openRescheduleOrderModal, setOpenRescheduleOrderModal] =
    useState(false);
  const [newRescheduleTime, setNewRescheduleTime] = useState<any>("");
  const [fullRows, setFullRows] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  const { data: session } = useSession() as any;

  const fetchData = async () => {
    let newRows: any[] = [];
    const userData = session?.user?.data?.user;
    for (let i = 1; i <= 2; i++) {
      try {
        await getItems(
          {
            tab: "orders",
            branch_id: userData?.branches?.join(","),
            status: String(i),
          },
          `/orders/admin/admin_orders`,
          userData?.key?.auth_key
        ).then((response) =>
          response?.data?.data?.orders?.map((timeSlotRows: any) =>
            timeSlotRows?.orders?.map((order: any) => {
              newRows.push({
                timeslot: timeSlotRows?.timeslot,
                ...order,
              });
            })
          )
        );
      } catch (error) {
        console.log("error: ", error);
      }
    }
    setFullRows(newRows);
    setRows(newRows);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncing]);

  const columns: GridColDef[] = [
    {
      field: "hashed_id",
      headerName: "ID",
      width: 200,
      valueGetter: (params: any) => (
        <Box display="flex" alignContent="center" gap={1}>
          <Typography fontSize={12}>{params.value}</Typography>
          {session?.user?.data?.user?.permissions?.filter(
            (p: string) => p == "supervisor"
          )?.length != 0 &&
            Number(params?.row?.status) < 6 && (
              <>
                <Tooltip title={`Cancel order: ${params.value}`}>
                  <CancelIcon
                    color="error"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setTargetOrder(params.value);
                      setOpenCancelOrderModal(!openCancelOrderModal);
                    }}
                  />
                </Tooltip>
                {/* <Tooltip title={`Reschedule order: ${params.value}`}>
                  <UpdateIcon
                    color="action"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setTargetOrder(params.value);
                      setOpenRescheduleOrderModal(!openRescheduleOrderModal);
                    }}
                  />
                </Tooltip>
                <Tooltip title={`Deliver order: ${params.value}`}>
                  <LocalShippingIcon
                    color="success"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setTargetOrder(params.value);
                      setOpenDeliverOrderModal(!openDeliverOrderModal);
                    }}
                  />
                </Tooltip> */}
              </>
            )}
        </Box>
      ),
      renderCell: (params: any) => params?.value,
    },
    {
      field: "timeslot",
      headerName: "Timeslot",
      width: 200,
      sortable: true,
    },
    {
      field: "status_text",
      headerName: "Status",
      width: 150,
      sortable: true,
      valueGetter: (params: any) => (
        <Chip
          sx={{ width: "100%", fontSize: "9pt" }}
          label={params?.row?.status_text}
          color={
            DASHBOARD_CONFIG.get("picker")?.statusVisualization.get(
              params?.row?.status
            ) ?? "default"
          }
        />
      ),
      renderCell: (params: any) => params.value,
    },
    {
      field: "created_at",
      headerName: "Created at",
      width: 200,
      sortable: true,
      valueGetter: (params: GridCellParams) =>
        moment.unix(params.row.created_at).format("YYYY-MM-DD HH:mm:ss"),
      renderCell: (params: any) => <span>{params?.value}</span>,
    },
    {
      field: "customer_id",
      headerName: "Customer ID",
      width: 150,
      sortable: true,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 200,
      sortable: true,
      valueGetter: (params: any) =>
        `${params?.row?.user?.firstname} ${params?.row?.user?.lastname}`,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 150,
      sortable: true,
      type: "number",
      valueGetter: (params: any) =>
        `${params?.row?.pricing?.grand_total?.amount}`,
      renderCell: (params: any) => (
        <span style={{ fontWeight: "bold" }}>
          {Number(params.value).toFixed(2)} SAR
        </span>
      ),
    },
    {
      field: "retail_price",
      headerName: "Retail Price",
      width: 150,
      sortable: true,
      type: "number",
      valueGetter: (params: any) =>
        `${params?.row?.pricing?.items?.at(0)?.amount}`,
      renderCell: (params: any) => (
        <span style={{ fontWeight: "bold" }}>
          {Number(params.value).toFixed(2)} SAR
        </span>
      ),
    },
    {
      field: "delivery_price",
      headerName: "Delivery Price",
      width: 150,
      sortable: true,
      type: "number",
      valueGetter: (params: any) =>
        `${params?.row?.pricing?.items?.at(1)?.amount}`,
      renderCell: (params: any) => (
        <span style={{ fontWeight: "bold" }}>
          {Number(params.value).toFixed(2)} SAR
        </span>
      ),
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      width: 150,
      sortable: true,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          sx={{ width: "80px" }}
          color={params.value != "Not Paid" ? "success" : "warning"}
        />
      ),
    },
    {
      field: "vat",
      headerName: "Vat",
      width: 150,
      sortable: true,
      type: "number",
      renderCell: (params: any) => (
        <span style={{ fontWeight: "bold" }}>{Number(params.value)} SAR</span>
      ),
    },
    {
      field: "payment_method_name",
      headerName: "Payment Method",
      width: 150,
      sortable: true,
    },
    {
      field: "delivery_ts_from_time",
      headerName: "Delivery From:",
      width: 200,
      sortable: true,
      valueGetter: (params: any) =>
        moment
          .unix(params?.row?.delivery?.ts_from_time)
          .format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "delivery_ts_to_time",
      headerName: "Delivery To:",
      width: 200,
      sortable: true,
      valueGetter: (params: any) =>
        moment
          .unix(params?.row?.delivery?.ts_to_time)
          .format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "branch_id",
      headerName: "Branch ID",
      width: 150,
      sortable: true,
      valueGetter: (params: any) => params?.row?.delivery?.branch?.id,
    },
    {
      field: "branch_name",
      headerName: "Branch Name",
      width: 150,
      sortable: true,
      valueGetter: (params: any) => params?.row?.delivery?.branch?.name,
    },
    {
      field: "branch_city",
      headerName: "Branch City",
      width: 150,
      sortable: true,
      valueGetter: (params: any) => params?.row?.delivery?.branch?.city,
    },
    {
      field: "address",
      headerName: "Address",
      width: 550,
      sortable: true,
      valueGetter: (params: any) =>
        params?.row?.delivery?.address?.formatted_address,
    },
  ];

  const filters = [
    {
      filterTitle: "Total Orders",
      filteredRows: fullRows,
    },
    {
      filterTitle: "Placed",
      filteredRows: fullRows?.filter((row: any) => row?.status == 1),
      status: 1,
    },
    {
      filterTitle: "Confirmed",
      filteredRows: fullRows?.filter((row: any) => row?.status == 2),
      status: 2,
    },
    {
      filterTitle: "Under-picking",
      filteredRows: fullRows?.filter((row: any) => row?.status == 3),
      status: 3,
    },
    {
      filterTitle: "Fulfilled",
      filteredRows: fullRows?.filter((row: any) => row?.status == 4),
      status: 4,
    },
    {
      filterTitle: "Out for Delivery",
      filteredRows: fullRows?.filter((row: any) => row?.status == 5),
      status: 5,
    },
    {
      filterTitle: "Delivered",
      filteredRows: fullRows?.filter((row: any) => row?.status == 6),
      status: 6,
    },
    {
      filterTitle: "Cancelled by Customer",
      filteredRows: fullRows?.filter((row: any) => row?.status == 7),
      status: 7,
    },
    {
      filterTitle: "Cancelled by Ops",
      filteredRows: fullRows?.filter((row: any) => row?.status == 8),
      status: 8,
    },
    {
      filterTitle: "Rescheduled",
      filteredRows: fullRows?.filter((row: any) => row?.status == 9),
      status: 9,
    },
  ];
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        justifyContent="space-between"
        alignItems="center"
        className="picker-stats"
        display="flex"
        width="100%"
        marginRight={2}
      >
        <Box
          justifyContent="space-between"
          alignItems="center"
          className="picker-stats"
          display="flex"
          gap={1}
          p={1}
          overflow={"auto"}
        >
          {filters.map((filter: any) => (
            <Box
              key={`orders-filter-${filter.filterTitle}`}
              sx={{
                height: "65px",
                borderRadius: "15px",
                border: `solid 2px lightgrey`,
                width: `100px`,
                cursor: "pointer",
              }}
              p={1}
              color={"white"}
              bgcolor={(theme: any) =>
                theme.palette[
                  DASHBOARD_CONFIG.get("picker")?.statusVisualization.get(
                    filter?.status
                  ) ?? "info"
                ].dark
              }
              position="relative"
              onClick={() => {
                setRows(filter?.filteredRows);
              }}
            >
              <Box maxWidth={"12ch"} sx={{ fontSize: "8pt", width: "100px" }}>
                {filter?.filterTitle}
              </Box>
              <Box
                position="absolute"
                className="stats-count"
                style={{ fontSize: "18pt", bottom: "5px", right: "10px" }}
              >
                {filter?.filteredRows?.length}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          display="flex"
          gap={1}
          alignItems="center"
          paddingX={2}
          marginX={1}
        >
          <Button
            sx={{ borderRadius: "9999px", padding: "5px" }}
            variant="outlined"
            color="success"
          >
            <SyncIcon onClick={() => setSyncing(!syncing)} fontSize="small" />
          </Button>
          <ExportBtn
            key={`export-btn`}
            fileName={`panda-picker-orders-export-${
              session?.user?.data?.user.name
            }-${Date().toString()}`}
            data={visibleRows}
            exportType="xls"
          />
        </Box>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <StripedDataGrid
          rows={rows}
          onStateChange={(e: any) => {
            let filteredRows: any[] = [];
            for (const key in e?.visibleRowsLookup) {
              if (e?.visibleRowsLookup[key]) {
                for (const similar_key in e?.rows?.dataRowIdToModelLookup) {
                  if (key == similar_key) {
                    const foundRow =
                      e?.rows?.dataRowIdToModelLookup[similar_key];
                    filteredRows.push({
                      ID: foundRow?.hashed_id,
                      Timeslot: foundRow?.timeslot,
                      Status: foundRow?.status_text,
                      created_at: `${moment
                        .unix(foundRow?.created_at)
                        .format("YYYY-MM-DD HH:mm:ss")}`,
                      customer_id: foundRow?.customer_id,
                      customer_name: `${foundRow?.user?.firstname} ${foundRow?.user?.lastname}`,
                      total_amount: Number(
                        foundRow?.pricing?.grand_total?.amount
                      ).toFixed(2),
                      retail_price: Number(
                        foundRow?.pricing?.items?.at(0)?.amount
                      ).toFixed(2),
                      delivery_price: Number(
                        foundRow?.pricing?.items?.at(1)?.amount
                      ).toFixed(2),
                      payment_status: foundRow?.payment_status,
                      Vat: Number(foundRow?.vat).toFixed(2),
                      "Payment Method": foundRow?.payment_method_name,
                      "Delivery From": `${moment
                        .unix(foundRow?.delivery?.ts_from_time)
                        .format("YYYY-MM-DD HH:mm:ss")}`,
                      "Delivery To": `${moment
                        .unix(foundRow?.delivery?.ts_to_time)
                        .format("YYYY-MM-DD HH:mm:ss")}`,
                      "Branch ID": foundRow?.delivery?.branch?.id,
                      "Branch Name": foundRow?.delivery?.branch?.name,
                      "Branch City": foundRow?.delivery?.branch?.city,
                      Address: foundRow?.delivery?.address?.formatted_address,
                    });
                    break;
                  }
                  continue;
                }
              }
            }
            setVisibleRows(filteredRows);
          }}
          columns={columns}
          getRowClassName={(params: any) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
          style={{
            fontSize: "10pt",
          }}
          // density="compact"
        />
      )}
      <GenericModal
        type="confirmation"
        question={`Do you want to cancel order: ${targetOrder}?`}
        open={openCancelOrderModal}
        onConfirm={async () => {
          const res = await pickerCancelOrder(
            targetOrder,
            session?.user?.data?.user?.key?.auth_key
          );
          setSyncing(!syncing);
        }}
        onClose={() => setOpenCancelOrderModal(!openCancelOrderModal)}
      />
      <GenericModal
        type="confirmation"
        question={`Do you want to deliver order: ${targetOrder}?`}
        open={openDeliverOrderModal}
        onConfirm={async () => {
          const res: any = await pickerDeliverOrder(
            targetOrder,
            session?.user?.data?.user?.key?.auth_key
          );
          if (res?.status == 200) {
            <GenericSnackbar
              message={`Delivered order: ${targetOrder} successfully`}
              handleOpen={true}
            />;
          } else {
          }
        }}
        onClose={() => setOpenDeliverOrderModal(!openDeliverOrderModal)}
      />
      <GenericModal
        type="form"
        attributes={[{ label: "", type: "date" }]}
        question={`Reschedule order: ${targetOrder}`}
        open={openRescheduleOrderModal}
        onConfirm={() => {
          const delivery_start_time = newRescheduleTime?.$d ?? new Date();
          const res = pickerRescheduleOrder(
            targetOrder,
            `${delivery_start_time
              ?.toISOString()
              ?.slice(0, 19)
              ?.replace("T", " ")}`,
            session?.user?.data?.user?.key?.auth_key
          );
        }}
        handleParentParameter={setNewRescheduleTime}
        onClose={() => setOpenRescheduleOrderModal(!openRescheduleOrderModal)}
      />
    </Box>
  );
};

export default PickerPage;
