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
import { selectedHeaders } from "../../helpers/Constants";
import moment from "moment";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

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

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  tContainer: {
    width: "fit-content",
    margin: 20,
  },
});

export default function CustomizedTables({ dates }) {
  const classes = useStyles();
  const [stats, setStats] = useState({
    ne: [],
    nb: [],
    wa: [],
  });
  const [statRows, setStatRows] = useState([]);
  const neReport = useFetch(
    `http://104.156.237.87:8080/report/summ/ne/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 }
  );
  const nbReport = useFetch(
    `http://104.156.237.87:8080/report/summ/nb/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 }
  );
  const waReport = useFetch(
    `http://104.156.237.87:8080/report/summ/wa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 }
  );
  const otherReport = useFetch(`http://104.156.237.87:8080/report/const/`, {
    results: [],
    count: 0,
  });

  let start = moment(dates.start_date, "YYYY-MM-DD");
  let end = moment(dates.end_date, "YYYY-MM-DD");

  // useEffect(() => {
  //   console.log(otherReport.response.results);
  // }, [otherReport.response.results]);

  useEffect(() => {
    setStats((stats) => ({
      ...stats,
      ne: neReport.response,
      nb: nbReport.response,
      wa: waReport.response,
    }));
  }, [neReport.response, nbReport.response, waReport.response]);

  useEffect(() => {
    // console.log(stats);
    setStatRows([
      {
        id: "SALES",
        ne: stats.ne.sales,
        nb: stats.nb.sales,
        wa: stats.wa.sales,
        gt: stats.ne.sales + stats.nb.sales + stats.wa.sales,
      },
      {
        id: "COST",
        ne: stats.ne.cost,
        wa: stats.wa.cost,
        nb: stats.nb.cost,
        gt: stats.ne.cost + stats.nb.cost + stats.wa.cost,
      },
      {
        id: "GROSS PROFIT",
        ne: stats.ne.gross_profit,
        nb: stats.nb.gross_profit,
        wa: stats.wa.gross_profit,
        gt:
          stats.ne.gross_profit + stats.nb.gross_profit + stats.wa.gross_profit,
      },
      {
        id: "COMMISSION",
        ne: stats.ne.commision_cost,
        nb: stats.nb.commision_cost,
        wa: stats.wa.commision_cost,
        gt:
          stats.ne.commision_cost +
          stats.nb.commision_cost +
          stats.wa.commision_cost,
      },
      {
        id: "SHIPPING/HANDLING",
        ne: stats.ne.shipping_cost,
        nb: stats.nb.shipping_cost,
        wa: stats.wa.shipping_cost,
        gt:
          stats.ne.shipping_cost +
          stats.nb.shipping_cost +
          stats.wa.shipping_cost,
      },
      {
        id: "OTHER",
        ne: moment.duration(start.diff(end)).asDays() * -1 * 50,
        nb: moment.duration(start.diff(end)).asDays() * -1 * 20,
        wa: moment.duration(start.diff(end)).asDays() * -1 * 80,
        gt:
          moment.duration(start.diff(end)).asDays() * -1 * 50 +
          moment.duration(start.diff(end)).asDays() * -1 * 20 +
          moment.duration(start.diff(end)).asDays() * -1 * 80,
      },
      // {
      //   id: "OTHER",
      //   ne: otherReport?.response?.results[2]?.other_exp,
      //   nb: otherReport?.response?.results[1]?.other_exp,
      //   wa: otherReport?.response?.results[0]?.other_exp,
      //   gt:
      //     otherReport?.response?.results[2]?.other_exp +
      //     otherReport?.response?.results[1]?.other_exp +
      //     otherReport?.response?.results[0]?.other_exp,
      // },
      {
        id: "NET PROFIT",
        ne:
          stats.ne.gross_profit -
          stats.ne.commision_cost -
          stats.ne.shipping_cost -
          moment.duration(start.diff(end)).asDays() * -1 * 50,
        nb:
          stats.nb.gross_profit -
          stats.nb.commision_cost -
          stats.nb.shipping_cost -
          moment.duration(start.diff(end)).asDays() * -1 * 20,
        wa:
          stats.wa.gross_profit -
          stats.wa.commision_cost -
          stats.wa.shipping_cost -
          moment.duration(start.diff(end)).asDays() * -1 * 80,
        gt:
          stats.ne.gross_profit -
          stats.ne.commision_cost -
          stats.ne.shipping_cost -
          moment.duration(start.diff(end)).asDays() * -1 * 50 +
          stats.nb.gross_profit -
          stats.nb.commision_cost -
          stats.nb.shipping_cost -
          moment.duration(start.diff(end)).asDays() * -1 * 20 +
          stats.wa.gross_profit -
          stats.wa.commision_cost -
          stats.wa.shipping_cost -
          moment.duration(start.diff(end)).asDays() * -1 * 80,
      },
    ]);
    // console.log(statRows);
    // eslint-disable-next-line
  }, [stats, otherReport?.response?.results]);

  useEffect(() => {
    // console.log(statRows);
  }, [dates]);
  return (
    <TableContainer className={classes.tContainer} component={Paper}>
      <h2>Selected</h2>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {selectedHeaders?.map((item) => (
              <StyledTableCell align="right" key={item?.id}>
                {item?.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {statRows?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.ne?.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.nb?.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.wa?.toFixed(2) || 0}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.gt?.toFixed(2) || 0}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
