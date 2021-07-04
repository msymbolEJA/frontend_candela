import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useFetch from "../../hooks/useFetch";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  tContainer: {
    width: "fit-content",
    margin: 20,
    marginLeft: 65,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [rows, setRows] = useState();
  const { response, error, loading, setLoading } = useFetch(
    `${BASE_URL}report/ne?end_date=2021-06-29&start_date=2021-04-12`,
    { results: [], count: 0 }
  );

  useEffect(() => {
    setRows(response.results);
    console.log(response.results);
  }, [response]);

  return (
    <TableContainer className={classes.tContainer} component={Paper}>
      <h2>Best Seller Items</h2>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Seller SKU</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Sum Total</StyledTableCell>
            <StyledTableCell align="right">Count SO</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.SellerPartNumber}
              </StyledTableCell>
              <StyledTableCell align="right" style={{ maxWidth: "250px" }}>
                {row.Description}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.sum_total_price}
              </StyledTableCell>
              <StyledTableCell align="right">{row.sum_item}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
