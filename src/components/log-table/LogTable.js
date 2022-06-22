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
import { TableLoadingSpinner } from "../../helpers/LoadingSpinners";
import { logTableColumns } from "../../helpers/Constants";
import { TableError } from "../../helpers/Errors";
import moment from "moment";

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
    `/logs/?order_num=${props.match.params.id}`,
    {},
    props.match.params.shop === "wal2" ? "http://216.128.135.6:8080" : null
  );
  const classes = useStyles();

  useEffect(() => {
    console.log(response);
  }, [response]);

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
              {logTableColumns?.map((item) => (
                <TableCell align="center" style={{ color: "white" }}>
                  {item?.label}
                </TableCell>
              ))}
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
                  {logTableColumns?.map((item) => (
                    <TableCell align="center">
                      {item?.id === "change_date"
                        ? moment
                            .utc(row[item?.id])
                            .local()
                            .format("MM-DD-YY HH:mm")
                        : row[item?.id]}
                    </TableCell>
                  ))}
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
