import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import moment from "moment";
import SearchField from "../otheritems/SearchField";
import useFetch from "../../../hooks/useFetch";
import { TableLoadingSpinner } from "../../../helpers/LoadingSpinners";
import { TableError } from "../../../helpers/Errors";
import CustomTableFooter from "../otheritems/CustomTableFooter";

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

export default function BBOrdersTable() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { response, error, loading, setLoading } = useFetch(
    `mc/?limit=${rowsPerPage}&offset=${
      page * rowsPerPage
    }&search=${searchKeyword}`,
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

  const globalSearch = (event, searchKey) => {
    event.preventDefault();
    setSearchKeyword(searchKey);
    setPage(0);
    setLoading(true);
  };

  return (
    <div>
      <h2 className={classes.headerStyle}>Micro Center</h2>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "0.3rem" }}
      >
        <SearchField globalSearch={globalSearch} />
      </div>
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
                Model Number
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Stock
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Release Date
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Sale Price
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
                    {row.name}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.manufacturer}
                  </TableCell>
                  <TableCell align="center">{row.modelNumber}</TableCell>
                  <TableCell align="center">{row.stock}</TableCell>
                  <TableCell align="center">
                    {row.releaseDate ? row.releaseDate : "-"}
                  </TableCell>
                  <TableCell align="center">{row.salePrice}</TableCell>
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
          {response?.results.length > 0 ? (
            <CustomTableFooter
              response={response}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          ) : null}
        </Table>
      </TableContainer>
    </div>
  );
}
