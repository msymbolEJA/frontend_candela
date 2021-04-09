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
import spinner from "../../../assets/spinner.gif";
import TopButtonGroup from "./TopButtonGroup";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tContainer: {
    marginLeft: "60px",
    width: `calc(100% - ${60}px)`,
  },
  tRow: {
    backgroundColor: "#52734d",
  },
  tCell: {
    color: "white",
  },
  headerStyle: {
    color: "#1f441e",
    fontSize: "2rem",
    fontFamily: "Courier New",
  },
});

export default function NEOrdersTable() {
  const [tableData, setTableData] = useState();
  const classes = useRowStyles();

  useEffect(() => {
    getData(`${BASE_URL}ne/?limit=100&offset=0`).then((response) => {
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
    <TableContainer component={Paper} className={classes.tContainer}>
      <h2 className={classes.headerStyle}>New Egg</h2>
      <TopButtonGroup />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tRow}>
            <TableCell />
            <TableCell className={classes.tCell}>Order Number</TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Date
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Status Description
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Item Amount
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Qty
            </TableCell>
            <TableCell align="right" className={classes.tCell}>
              Order Total Amount
            </TableCell>
          </TableRow>
        </TableHead>
        {tableData ? (
          <TableBody>
            {tableData?.rows?.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>
                <img
                  src={spinner}
                  style={{
                    width: 50,
                    float: "right",
                  }}
                  alt="spinner"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
