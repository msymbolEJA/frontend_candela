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
import { Doughnut } from "react-chartjs-2";

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
  chartDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    border: "3px solid #FF6384",
    padding: "25px",
    margin: "25px",
    borderRadius: "10px",
  },
});

export default function CustomizedTables({ dates }) {
  const classes = useStyles();
  const [stats, setStats] = useState({
    ne: [],
    nb: [],
    wa: [],
    wa2: [],
  });
  const [statRows, setStatRows] = useState([]);
  const neReport = useFetch(
    `report/summ/ne/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 }
  );
  const nbReport = useFetch(
    `report/summ/nb/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 }
  );
  const waReport = useFetch(
    `report/summ/wa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 }
  );
  const waReport2 = useFetch(
    `report2/summ/wa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 },
    "http://216.128.135.6:8080/"
  );
  const otherReport = useFetch(`report/const/`, {
    results: [],
    count: 0,
  });

  let start = moment(dates.start_date, "YYYY-MM-DD");
  let end = moment(dates.end_date, "YYYY-MM-DD");

  useEffect(() => {
    setStats((stats) => ({
      ...stats,
      ne: neReport.response,
      nb: nbReport.response,
      wa: waReport.response,
      wa2: waReport2.response,
    }));
  }, [
    neReport.response,
    nbReport.response,
    waReport.response,
    waReport2.response,
  ]);

  useEffect(() => {
    // console.log(stats);
    setStatRows([
      {
        id: "SALES",
        wa: stats.wa.sales,
        wa2: stats.wa2.sales,
        ne: stats.ne.sales,
        nb: stats.nb.sales,
        gt:
          stats.ne.sales +
          stats.nb.sales +
          stats.wa.sales +
          (stats.wa2.sales || 0),
      },
      {
        id: "COST",
        wa: stats.wa.cost,
        wa2: stats.wa2.cost,
        ne: stats.ne.cost,
        nb: stats.nb.cost,
        gt:
          stats.ne.cost + stats.nb.cost + stats.wa.cost + (stats.wa2.cost || 0),
      },
      {
        id: "GROSS PROFIT",
        wa: stats.wa.gross_profit,
        wa2: stats.wa2.gross_profit,
        ne: stats.ne.gross_profit,
        nb: stats.nb.gross_profit,
        gt:
          stats.ne.gross_profit +
          stats.nb.gross_profit +
          stats.wa.gross_profit +
          (stats.wa2.gross_profit || 0),
      },
      {
        id: "COMMISSION",
        wa: stats.wa.commision_cost,
        wa2: stats.wa2.commision_cost,
        ne: stats.ne.commision_cost,
        nb: stats.nb.commision_cost,
        gt:
          stats.ne.commision_cost +
          stats.nb.commision_cost +
          stats.wa.commision_cost +
          (stats.wa2.commision_cost || 0),
      },
      {
        id: "SHIPPING/HANDLING",
        wa: stats.wa.shipping_cost,
        wa2: stats.wa2.shipping_cost,
        ne: stats.ne.shipping_cost,
        nb: stats.nb.shipping_cost,
        gt:
          stats.ne.shipping_cost +
          stats.nb.shipping_cost +
          stats.wa.shipping_cost +
          (stats.wa2.shipping_cost || 0),
      },
      {
        id: "OTHER",
        wa:
          moment.duration(start.diff(end)).asDays() *
          -1 *
          stats.wa.daily_other_exp,
        wa2:
          moment.duration(start.diff(end)).asDays() *
          -1 *
          (stats.wa2.daily_other_exp || 0),
        ne:
          moment.duration(start.diff(end)).asDays() *
          -1 *
          stats.ne.daily_other_exp,
        nb:
          moment.duration(start.diff(end)).asDays() *
          -1 *
          stats.nb.daily_other_exp,
        gt:
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.ne.daily_other_exp +
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.nb.daily_other_exp +
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.wa.daily_other_exp +
          moment.duration(start.diff(end)).asDays() *
            -1 *
            (stats.wa2.daily_other_exp || 0),
      },
      {
        id: "NET PROFIT",
        wa:
          stats.wa.gross_profit -
          stats.wa.commision_cost -
          stats.wa.shipping_cost -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.wa.daily_other_exp,
        wa2:
          (stats.wa2.gross_profit || 0) -
          (stats.wa2.commision_cost || 0) -
          (stats.wa2.shipping_cost || 0) -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            (stats.wa2.daily_other_exp || 0),
        ne:
          stats.ne.gross_profit -
          stats.ne.commision_cost -
          stats.ne.shipping_cost -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.ne.daily_other_exp,
        nb:
          stats.nb.gross_profit -
          stats.nb.commision_cost -
          stats.nb.shipping_cost -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.nb.daily_other_exp,
        gt:
          stats.ne.gross_profit -
          stats.ne.commision_cost -
          stats.ne.shipping_cost -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.ne.daily_other_exp +
          stats.nb.gross_profit -
          stats.nb.commision_cost -
          stats.nb.shipping_cost -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.nb.daily_other_exp +
          stats.wa.gross_profit -
          stats.wa.commision_cost -
          stats.wa.shipping_cost -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.wa.daily_other_exp +
          stats.wa2.gross_profit -
          stats.wa2.commision_cost -
          stats.wa2.shipping_cost -
          moment.duration(start.diff(end)).asDays() *
            -1 *
            stats.wa2.daily_other_exp,
      },
    ]);
    // eslint-disable-next-line
  }, [stats, otherReport?.response?.results]);

  const getPercentage = (shop, index) => {
    const total =
      (statRows[index]?.wa >= 0 ? statRows[index]?.wa : 0) +
      (statRows[index]?.wa2 >= 0 ? statRows[index]?.wa2 : 0) +
      (statRows[index]?.nb >= 0 ? statRows[index]?.nb : 0) +
      (statRows[index]?.ne >= 0 ? statRows[index]?.ne : 0);
    return (
      (100 * (statRows[index]?.[shop] > 0 ? statRows[index]?.[shop] : 0)) /
      total
    ).toFixed(1);
  };

  const salesData = {
    labels: ["Walmart", "Walmart2", "NewEgg Bussines", "NewEgg"],
    datasets: [
      {
        label: "Sales 2020 (M)",
        data: [
          getPercentage("wa", 0),
          getPercentage("wa2", 0),
          getPercentage("nb", 0),
          getPercentage("ne", 0),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(0, 200, 0, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
      },
    ],
  };

  const salesOptions = {
    title: {
      display: true,
      text: "Doughnut Chart",
    },
  };

  const netProfitData = {
    labels: ["Walmart", "Walmart2", "NewEgg Bussines", "NewEgg"],
    datasets: [
      {
        label: "Sales 2020 (M)",
        data: [
          getPercentage("wa", 6),
          getPercentage("wa2", 6),
          getPercentage("nb", 6),
          getPercentage("ne", 6),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(0, 200, 0, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
      },
    ],
  };

  const netProfitOptions = {
    title: {
      display: true,
      text: "Doughnut Chart",
    },
  };

  return (
    <div style={{ width: "60%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
                    {row.wa?.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.wa2?.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.ne?.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.nb?.toFixed(2) || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.gt?.toFixed(2) || 0}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.chartDiv}>
        <div style={{ width: "40%" }}>
          <h3>Sales (%)</h3>
          <Doughnut data={salesData} options={salesOptions} />
        </div>
        <div style={{ width: "40%" }}>
          <h3>Net Profit (%)</h3>
          <Doughnut data={netProfitData} options={netProfitOptions} />
        </div>
      </div>
    </div>
  );
}
