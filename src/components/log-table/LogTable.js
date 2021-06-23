import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import moment from "moment";
import { TableLoadingSpinner } from "../../helpers/LoadingSpinners";
import { TableError } from "../../helpers/Errors";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  headerStyle: {
    color: "#1f441e",
    fontSize: "2rem",
    marginBottom: "1rem",
    fontFamily: "Courier New",
  },
  headingRow: {
    backgroundColor: "#52734d",
    color: "white",
  },
  rowStyle: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#feffde",
    },
  },
});

const LogTable = (props) => {
  const { response, error, loading } = useFetch(
    `${BASE_URL}/logs/?order_num${props.match.params.id}`,
    {}
  );
  const classes = useStyles();

  useEffect(() => {
    console.log(response);
  }, [response]);

  console.log(props.match.params.id);
  return (
    <div>
      <h2 className={classes.headerStyle}>Log Table</h2>
      <TableContainer
        style={{ marginLeft: "60px", width: "auto", marginRight: 1 }}
        component={Paper}
      >
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow className={classes.headingRow}>
              <TableCell align="center" style={{ color: "white" }}>
                Id
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Order Number
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                User
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Field
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Updated Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableLoadingSpinner />
            ) : error ? (
              <TableError />
            ) : response?.results?.length > 0 ? (
              response?.results?.map((row, index) => (
                <TableRow key={index} className={classes.rowStyle}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ maxWidth: 600 }}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.order_num}
                  </TableCell>
                  <TableCell align="center">{row.user}</TableCell>
                  <TableCell align="center">{row.field}</TableCell>
                  <TableCell align="center">{row.updated_data}</TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td
                  colSpan="16"
                  style={{
                    display: "table-cell",
                    height: "5rem",
                    color: "#CC2828",
                  }}
                >
                  <h2>There is nothing in this search.</h2>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LogTable;

/*
{response?.count}
      {response?.results?.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
          <p>{item.change_date}</p>
          <p>{item.field}</p>
          <p>{item.order_num}</p>
        </div>
      ))}
*/
