import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getData } from "../../../helpers/DataTransitions";
import Row from "./DetailsTable";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tContainer: {
    marginLeft: "75px",
    width: `calc(100% - ${75}px)`,
  },
  tRow: {
    backgroundColor: "#52734d",
  },
  tCell: {
    color: "white",
  },
});

export default function NEOrdersTable() {
  const [tableData, setTableData] = useState();
  const classes = useRowStyles();

  useEffect(() => {
    getData(`${BASE_URL}ne/?limit=100&offset=0`).then((response) => {
      //console.log(response.data);
      setTableData({
        ...tableData,
        rows: response.data.results,
        count: response.data.count,
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <h2>New Egg</h2>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tRow}>
            <TableCell />
            <TableCell className={classes.tCell}>OrderNumber</TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderDate
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderStatusDescription
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderItemAmount
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderQty
            </TableCell>
            <TableCell align="right" className={classes.tCell}>
              OrderTotalAmount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.rows?.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
