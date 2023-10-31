"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import RotatingSquareLoader from "../Loader/RotatingSquareLoader";
import { createDynamicObject, deleteItem, getItems } from "@/utils/data";
import tablesAttibutes from "@/config.tables";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UploadCsvBtn from "../common/UploadCsvBtn";
import TableExpandComponent from "./TableExpandComponent";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import ExportCsvBtn from "../common/ExportCsvBtn";

//---------------------------------------------------------------//
//--> Custom Table Styles ---------------------------------------//
const customStyles = {
  headRow: {
    style: {
      borderBottom: "solid 2px black",
      fontSize: "12pt",
      fontWeight: 600,
    },
  },
  rows: {
    style: {
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};
//---------------------------------------------------------------//
//---------------------------------------------------------------//
//--> Table Props -----------------------------------------------//
interface IMainTableProps {
  params: {
    tab: string;
    page?: string;
    sort?: string;
    branch_id?: string;
    delivery_type?: string;
    perPage?: number;
    status?: string;
  };
}
const MainTable = (props: IMainTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userData = session?.user as any;
  //---------------------------------------------------------------//
  const [data, setData] = useState<any>([]);
  const [user, setUser] = useState<User>(userData?.data?.user);
  const [refreshInterval, setRefreshInterval] = useState(Date.now());
  const [columns, setColumns] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  //--> Extra Attributes Mapping -----------------------------------//
  const permissionsMapping = new Map([["orders", "picker"]]);
  //--> Extra Attributes Mapping -----------------------------------//
  const extraAttrMapping = new Map([
    ["orders", `/orders/picker_orders/${user?.id}`],
  ]);
  //--> Custom Response Mapping --------------------------------------//
  const endpointsResponseRowsMapping = new Map([
    [
      "orders",
      (data: any) => {
        let rows: any[] = [];
        data?.data?.orders?.map((timeSlotRows: any) =>
          timeSlotRows?.orders?.map((order: any) => {
            rows.push({
              timeslot: timeSlotRows?.timeslot,
              ...order,
            });
          })
        );
        return rows;
      },
    ],
  ]);
  //--> Custom Params Mapping --------------------------------------//
  const endpointsAuthMapping = new Map([["orders", user?.key?.auth_key]]);
  //--> Custom Params Mapping --------------------------------------//
  const customParamsMapping = new Map([
    [
      "orders",
      {
        status: props.params?.status || ["1", "2"],
        branch_id: user?.branches?.join(","),
      },
    ],
    ["", {}],
  ]);
  //--> Actions Mapping -------------------------------------------//
  const customActionsMapping = new Map([
    [
      "products",
      <UploadCsvBtn
        key={`upload-btn`}
        onFileConverted={(data) => console.log("file: ", data)}
      />,
    ],
    [
      "orders",
      <ExportCsvBtn
        key={`export-btn`}
        fileName={`panda-picker-orders-export-${
          user.name
        }-${Date().toString()}`}
        data={data}
        exportType="xls"
      />,
    ],
  ]);
  //--> Context Actions Mapping -----------------------------------//
  const customContextActionsMapping = new Map([["orders", <>New Action</>]]);
  //----------------------------------------------------------------//
  //--> Define Actions for tables "Add" / "Import CSV" / ...
  const actions = customActionsMapping.get(props.params.tab) ?? (
    <Link href={`/dashboard/action/add?item=${props.params.tab}`}>
      <Button key="add" style={{ backgroundColor: "green" }}>
        Add
      </Button>
    </Link>
  );
  //----------------------------------------------------------------//
  //--> The main function for
  //     (1) fetching any type of data
  //     (2) Setting columns
  //     (3) Setting Paging
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async (page = props.params.page) => {
    try {
      setLoading(true);
      //--> Check if needed user permissions
      const neededPermission: string | undefined = permissionsMapping.get(
        props.params.tab
      );
      if (neededPermission) {
        if (
          !user.permissions?.filter(
            (permission: string) => neededPermission == permission
          )
        ) {
          setData([]);
          setTotalRows(0);
          return null;
        }
      }
      //--> Get data
      let customParams: object =
        customParamsMapping.get(props.params.tab) || props.params;
      //-->  Check if needed to loop over any params
      let iterable: any[] = [];
      let iterableKey: any = null;
      Object.entries(customParams).map(([key, value]: any) => {
        if (Array.isArray(value)) {
          iterable = value;
          iterableKey = key;
        }
      });
      if (!iterableKey) {
        const response = await getItems(
          customParams,
          extraAttrMapping.get(props.params.tab),
          endpointsAuthMapping.get(props.params.tab)
        );
        const customResponseHandler = endpointsResponseRowsMapping.get(
          props.params.tab
        );
        const defaultRows = response?.data?.data[props.params.tab];
        const defaultRowsLength = page
          ? response?.data?.data?.total_records
          : response?.data?.data[props.params.tab]?.length;
        const newRows = customResponseHandler
          ? customResponseHandler(response?.data)
          : defaultRows;
        const newRowsLength = customResponseHandler
          ? data.length
          : defaultRowsLength;
        setData(newRows);
        setTotalRows(newRowsLength);
      } else {
        let totalData: any[] = [];
        for (let i = 0; i < iterable.length; i++) {
          const val = iterable[i];
          const response = await getItems(
            createDynamicObject(
              [
                ...Object.keys(customParams).filter(
                  (key: any) => key != iterableKey
                ),
                iterableKey,
              ],
              [
                ...Object.values(customParams).filter(
                  (val: any) => val != iterable
                ),
                val,
              ]
            ),
            extraAttrMapping.get(props.params.tab),
            endpointsAuthMapping.get(props.params.tab)
          );
          const customResponseHandler = endpointsResponseRowsMapping.get(
            props.params.tab
          );
          const defaultRows = response?.data?.data[props.params.tab];
          const newRows = customResponseHandler
            ? customResponseHandler(response?.data)
            : defaultRows;
          totalData.push(...newRows);
        }
        console.log("totalData: ", totalData);
        setData(totalData);
        setTotalRows(totalData.length);
      }
      setColumns(tablesAttibutes.get(props.params.tab)?.table_columns);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //----------------------------------------------------------------//
  //--> Handle page change by changing url page parameter
  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", page.toLocaleString());
    if (!current.get("tab")) {
      current.set("tab", "products");
      current.set("perPage", "15");
    }
    const search = current.toString();
    router.push(`${pathname}${search ? `?${search}` : ""}`);
  };
  //----------------------------------------------------------------//
  //--> Handle deletion of data, then loading the table again
  const deleteData = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteItem(props.params.tab, id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${selectedRows.map(
          (r: any) => r.title
        )}?`
      )
    ) {
      setToggleCleared(!toggleCleared);
      setLoading(true);
      selectedRows.map((row: any) => {
        deleteData(row.id);
      });
      setLoading(false);
      // setData(differenceBy(data, selectedRows, "id"));
    }
  };
  //----------------------------------------------------------------//
  //--> Setting selected rows state
  const handleRowSelected = React.useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);
  //----------------------------------------------------------------//
  //--> Handle Multi-Selected rows available Actions
  const contextActions = React.useMemo(() => {
    const ctxAction = customContextActionsMapping.get(props.params.tab);
    return (
      <div className="d-flex gap-2 align-items-center">
        {ctxAction ?? (
          <Button
            key="delete"
            onClick={handleDelete}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </Button>
        )}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows, toggleCleared]);
  //----------------------------------------------------------------//
  //--> Re-fetch data on any params change: page, item, ...filters
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, searchParams]);
  // useEffect(() => {
  //   if (props.params.tab == "orders") {
  //     const interval = setInterval(() => {
  //       fetchData();
  //       setRefreshInterval(Date.now());
  //     }, 10000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props]);

  //----------------------------------------------------------------//
  //----------------------------------------------------------------//
  return (
    <DataTable
      title={`${props.params.tab} (${totalRows} records)`}
      columns={columns}
      data={data}
      paginationPerPage={Number(props.params.perPage) || 10}
      progressComponent={<RotatingSquareLoader />}
      progressPending={loading}
      // onRowClicked={handleRowClicked}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={handlePageChange}
      customStyles={customStyles}
      actions={actions}
      className="w-100"
      selectableRows
      dense
      expandableRows
      expandableRowExpanded={(row: any) => row.defaultExpanded}
      expandableRowsComponent={TableExpandComponent}
      // highlightOnHover
      // pointerOnHover
      onColumnOrderChange={(cols: any) => {}}
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      // fixedHeader
      // fixedHeaderScrollHeight="78vh"
    />
  );
};

export default MainTable;
