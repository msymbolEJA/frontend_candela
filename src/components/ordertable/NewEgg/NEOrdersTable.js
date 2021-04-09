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
  const [buttonTag, setButtonTag] = useState("");

  useEffect(() => {
    setTableData();
    getData(
      `${BASE_URL}ne/?OrderStatus=${buttonTag}&limit=100&offset=100`
    ).then((response) => {
      console.log(response);
      setTableData({
        ...tableData,
        rows: response.data.results,
        count: response.data.count,
      });
    });
    // return () => setTableData(false);
    // eslint-disable-next-line
  }, [buttonTag]);

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <h2 className={classes.headerStyle}>New Egg</h2>
      <TopButtonGroup buttonTag={buttonTag} setButtonTag={setButtonTag} />
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
        {tableData?.rows.length > 0 ? (
          <TableBody>
            {tableData?.rows?.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        ) : tableData?.rows?.length === 0 ? (
          <tbody>
            <tr>
              <td
                colSpan="18"
                style={{
                  display: "table-cell",
                  height: "5rem",
                }}
              >
                <h2>There are no orders.</h2>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan="18"
                style={{
                  display: "table-cell",
                  height: "5rem",
                }}
              >
                <img
                  src={spinner}
                  style={{
                    width: 50,
                  }}
                  alt="spinner"
                />
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </TableContainer>
  );
}
