import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../helpers/DataTransitions";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OrderTable = () => {
  const [tableData, setTableData] = useState({ rows: [], count: 0 });
  let { id } = useParams();
  useEffect(() => {
    getData(`${BASE_URL}${id}/?limit=100&offset=0`).then((response) => {
      //   console.log(response.data.count);
      //   console.log(response.data.results);
      setTableData({
        ...tableData,
        rows: response.data.results,
        count: response.data.count,
      });
    });
  }, [id, tableData]);

  const handleGetData = () => {
    console.log({ tableData });
  };

  return (
    <div>
      <h1>Orders Table - {id}</h1>
      <button onClick={handleGetData}>GetData</button>
    </div>
  );
};

export default OrderTable;
