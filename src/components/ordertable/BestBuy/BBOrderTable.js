import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import { getData } from "../../../helpers/DataTransitions";
import spinner from "../../../assets/spinner.gif";
import moment from "moment";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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
    getData(`${BASE_URL}bb/?limit=100&offset=0`).then((response) => {
      console.log(response);
      setTableData({
        ...tableData,
        rows: response.data.results,
        count: response.data.count,
      });
    });
    // eslint-disable-next-line
  }, []);

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
              (rowsPerPage > 0
                ? tableData?.rows?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tableData?.rows
              ).map((row, index) => (
                <TableRow key={index} className={classes.rowStyle}>
                  <TableCell align="center" component="th" scope="row">
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
                      <a href={row?.url} target="_blank" rel="noreferrer">
                        Visit
                      </a>
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

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={tableData?.count || 0}
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