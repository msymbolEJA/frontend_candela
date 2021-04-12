import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import { getData } from "../../../helpers/DataTransitions";
import TablePaginationActions from "./TablePagination";
import spinner from "../../../assets/spinner.gif";
import moment from "moment";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles2 = makeStyles({
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

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [tableData, setTableData] = useState({ rows: [], count: 0 });

  useEffect(() => {
    getData(
      `${BASE_URL}bb/?limit=${rowsPerPage}&offset=${page * rowsPerPage}`
    ).then((response) => {
      console.log(response.data.results);
      setTableData({
        ...tableData,
        rows: response.data.results,
        count: response.data.count,
      });
    });
    // eslint-disable-next-line
  }, [rowsPerPage, page]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, tableData?.rows?.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2 className={classes.headerStyle}>Best Buy</h2>
      <TableContainer
        style={{ marginLeft: "60px", width: "auto", marginRight: 1 }}
        component={Paper}
      >
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow className={classes.headingRow}>
              <TableCell align="center" style={{ color: "white" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Manufacturer
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                ModelNumber
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Online Availability
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Release Date
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Sale Price
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Shipping Cost
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Shipping Weight
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                SKU
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                UPC
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Created Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.rows.length > 0 ? (
              tableData?.rows.map((row, index) => (
                <TableRow key={index} className={classes.rowStyle}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ maxWidth: 600 }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.manufacturer}
                  </TableCell>
                  <TableCell align="center">{row.modelNumber}</TableCell>
                  <TableCell align="center">
                    {row.onlineAvailability ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {row.releaseDate ? row.releaseDate : "-"}
                  </TableCell>
                  <TableCell align="center">{row.salePrice}</TableCell>
                  <TableCell align="center">{row.shippingCost}</TableCell>
                  <TableCell align="center">{row.shippingWeight}</TableCell>
                  <TableCell align="center">{row.sku}</TableCell>
                  <TableCell align="center">
                    <>
                      <p className={classes.priceStyle}>{row?.upc}</p>
                      {row?.url ? (
                        <a href={row?.url} target="_blank" rel="noreferrer">
                          Visit
                        </a>
                      ) : (
                        <p>No Link</p>
                      )}
                    </>
                  </TableCell>
                  <TableCell align="center">
                    {moment
                      .utc(row.createdate)
                      .local()
                      .format("MM-DD-YY HH:mm")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
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
            )}

            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100, 250, 500, 2500]}
                colSpan={22}
                count={tableData?.count}
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
        </Table>
      </TableContainer>
    </div>
  );
}
