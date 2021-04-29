import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import Row from "./DetailsTable";
import TopButtonGroup from "./TopButtonGroup";
import useFetch from "../../../hooks/useFetch";
import { TableLoadingSpinner } from "../../../helpers/LoadingSpinners";
import { TableError } from "../../../helpers/Errors";

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
  const classes = useRowStyles();
  const [buttonTag, setButtonTag] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const {
    response,
    error,
    loading,
    setLoading,
  } = useFetch(
    `${BASE_URL}ne/b2b/?OrderStatus=${buttonTag}&limit=${rowsPerPage}&offset=${
      page * rowsPerPage
    }`,
    { results: [], count: 0 }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoading(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setLoading(true);
  };

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <h2 className={classes.headerStyle}>New Egg Business Orders</h2>
      <TopButtonGroup
        buttonTag={buttonTag}
        setButtonTag={setButtonTag}
        setLoading={setLoading}
      />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tRow}>
            <TableCell align="center" className={classes.tCell}>
              Order Number
            </TableCell>
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
            <TableCell align="center" className={classes.tCell}>
              Order Total Amount
            </TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <tbody>
            <TableLoadingSpinner />
          </tbody>
        ) : error ? (
          <tbody>
            <TableError />
          </tbody>
        ) : response?.results?.length > 0 ? (
          <>
            <TableBody>
              {response?.results?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <td colSpan={2} style={{ textAlign: "right" }}>
                  Total Record :
                </td>
                <td style={{ textAlign: "left", paddingLeft: "5px" }}>
                  {response?.count || 0}
                </td>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 100, 250, 500, 2500]}
                  colSpan={22}
                  count={response?.count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </>
        ) : response?.results?.length === 0 ? (
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
        ) : null}
      </Table>
    </TableContainer>
  );
}
