import React, { useEffect, useState } from "react";
import { getData } from "../../../helpers/DataTransitions";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const WalOrdersTable = () => {
  const [tableData, setTableData] = useState({ rows: [], count: 0 });
  useEffect(() => {
    getData(`${BASE_URL}wal/?limit=25&offset=0`).then((response) => {
      console.log(response.data);
      setTableData({
        ...tableData,
        rows: response.data.results,
        count: response.data.count,
      });
    });
    // return () => setTableData(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Wallmart</h2>
      <h5>Count : {tableData.count}</h5>
    </div>
  );
};

export default WalOrdersTable;
