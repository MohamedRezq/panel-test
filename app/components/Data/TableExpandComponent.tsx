import React from "react";

const TableExpandComponent = ({ data }: any) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default TableExpandComponent;
