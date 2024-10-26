import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import useFetch from "../../hooks/useFetch";
import { bestSellerTableHeaders } from "../../helpers/Constants";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {bestSellerTableHeaders.map((headCell, index) => (
          <TableCell
            key={index}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "fit-content",
    margin: 20,
    marginLeft: 65,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tContainer: {
    padding: 20,
  },
}));

export default function EnhancedTable({ dates }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [rows, setRows] = useState([]);
  // const neOrders = useFetch(
  //   `report/ne?end_date=${dates.end_date}&start_date=${dates.start_date}`,
  //   { results: [], count: 0 },
  //   process.env.REACT_APP_CANDELA_1_URL
  // );

  // const cawaOrders = useFetch(
  //   `report/cawa?end_date=${dates.end_date}&start_date=${dates.start_date}`,
  //   { results: [], count: 0 },
  //   process.env.REACT_APP_CANDELA_1_URL
  // );

  const wa2Orders = useFetch(
    `report2/wa?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_2_URL,
  );
  const wa3Orders = useFetch(
    `report3/wa?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_3_URL,
  );

  const ebayOrders = useFetch(
    `report3/ebay?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_3_URL,
  );

  useEffect(() => {
    const newArr = [
      // ...neOrders.response.results,
      // ...cawaOrders.response.results,
      ...wa2Orders.response.results,
      ...wa3Orders.response.results,
      ...ebayOrders.response.results,
    ];
    setRows(newArr);
  }, [
    // neOrders?.response?.results,
    wa3Orders?.response?.results,
    // cawaOrders?.response?.results,
    wa2Orders?.response?.results,
    ebayOrders?.response?.results,
  ]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <h2>Best Seller Items</h2>
      <Paper className={classes.paper}>
        <TableContainer className={classes.tContainer}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {bestSellerTableHeaders?.map((item, ind) =>
                        item?.label === "Seller Store" ? (
                          <TableCell
                            component="th"
                            id={labelId}
                            key={ind}
                            scope="row"
                            style={{ maxWidth: "250px" }}
                            align="center"
                          >
                            {row[item?.id]?.startsWith("MC")
                              ? "Micro Center"
                              : row[item?.id]?.startsWith("NC")
                              ? "Best Buy"
                              : row[item?.id]?.startsWith("AC")
                              ? "Amazon"
                              : row[item?.id]?.startsWith("ML")
                              ? "Malabs"
                              : "Other"}
                          </TableCell>
                        ) : (
                          <TableCell
                            component="th"
                            id={labelId}
                            key={item.id}
                            scope="row"
                            style={{ maxWidth: "250px" }}
                            align="center"
                          >
                            {row[item?.id]}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100, 1000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
