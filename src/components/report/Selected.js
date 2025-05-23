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
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
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
  infoText: {
    fontWeight: "bold",
    padding: 8,
  },
  selectedText: {
    padding: 8,
  },
});

export default function CustomizedTables({ dates, IsShowMete }) {
  const classes = useStyles();
  const [stats, setStats] = useState({
    // ne: [],
    // nb: [],
    wa3: [],
    // cawa: [],
    wa2: [],
    ebay: [],
    amazon: []
  });
  const [statRows, setStatRows] = useState([]);
  // const neReport = useFetch(
  //   `report/summ/ne/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
  //   { results: [], count: 0 },
  //   process.env.REACT_APP_CANDELA_1_URL,
  // );
  // const nbReport = useFetch(
  //   `report/summ/nb/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
  //   { results: [], count: 0 },
  //   process.env.REACT_APP_CANDELA_1_URL,
  // );
  const wa3Report = useFetch(
    `report3/summ/wa/?end_date=${dates.end_date}&start_date=${dates.start_date}${
      IsShowMete ? "&store=METE_" : ""
    }`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_3_URL,
  );
  // const cawaReport = useFetch(
  //   `report/summ/cawa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
  //   { results: [], count: 0 },
  //   process.env.REACT_APP_CANDELA_1_URL,
  // );
  const waReport2 = useFetch(
    `report2/summ/wa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_2_URL,
  );
  const ebayReport = useFetch(
    `report3/summ/ebay/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_3_URL,
  );
  const amazonReport = useFetch(
    `report3/summ/amazon/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_3_URL,
  );

  const otherReport = useFetch(
    `report/const/`,
    {
      results: [],
      count: 0,
    },
    process.env.REACT_APP_CANDELA_1_URL,
  );

  useEffect(() => {
    setStats(stats => ({
      ...stats,
      // ne: neReport.response,
      // nb: nbReport.response,
      wa3: wa3Report.response,
      // cawa: cawaReport.response,
      wa2: waReport2.response,
      ebay: ebayReport.response,
      amazon: amazonReport.response,
    }));
  }, [
    // neReport.response,
    // nbReport.response,
    wa3Report.response,
    // cawaReport.response,
    waReport2.response,
    ebayReport.response,
    amazonReport.response,
  ]);

  useEffect(() => {
    // console.log(stats);
    setStatRows([
      {
        id: "SALES",
        wa3: stats.wa3.sales,
        // cawa: stats.cawa.sales,
        wa2: stats.wa2.sales,
        ebay: stats.ebay.sales,
        amazon: stats.amazon.sales,
        // // ne: stats.ne.sales,
        // // nb: stats.nb.sales,
        gt:
          // (stats.cawa.sales || 0) +
          // (stats.ne.sales || 0) +
          // (stats.nb.sales || 0) +
          (stats.wa3.sales || 0) + (stats.wa2.sales || 0) + (stats.ebay.sales || 0) + (stats.amazon.sales || 0),
      },
      {
        id: "PO COST",
        wa3: stats.wa3.cost,
        // cawa: stats.cawa.cost,
        wa2: stats.wa2.cost,
        ebay: stats.ebay.cost,
        amazon: stats.amazon.cost,
        // // ne: stats.ne.cost,
        // // nb: stats.nb.cost,
        gt:
          // (stats.cawa.cost || 0) +
          // (stats.ne.cost || 0) +
          // (stats.nb.cost || 0) +
          (stats.wa3.cost || 0) + (stats.wa2.cost || 0) + (stats.ebay.cost || 0) + (stats.amazon.cost || 0),
      },

      // {
      //   id: 'COMISSION COST',
      //   wa3: stats.wa3.commision_cost,
      // //   cawa: stats.cawa.commision_cost,
      //   wa2: stats.wa2.commision_cost,
      // // //   ne: stats.ne.commision_cost,
      // // //   nb: stats.nb.commision_cost,
      //   gt:
      //     // (stats.cawa.commision_cost || 0) +
      // //     (stats.ne.commision_cost || 0) +
      // //     (stats.nb.commision_cost || 0) +
      //     (stats.wa3.commision_cost || 0) +
      //     (stats.wa2.commision_cost || 0),
      // },

      {
        id: "SHIP COST",
        wa3: stats.wa3.ship_cost,
        // cawa: stats.cawa.ship_cost,
        wa2: stats.wa2.ship_cost,
        ebay: stats.ebay.ship_cost,
        amazon: stats.amazon.ship_cost,
        // // ne: stats.ne.ship_cost,
        // // nb: stats.nb.ship_cost,
        gt:
          // (stats.cawa.gross_profit || 0) +
          // (stats.ne.ship_cost || 0) +
          // (stats.nb.ship_cost || 0) +
          (stats.wa3.ship_cost || 0) + (stats.wa2.ship_cost || 0) + (stats.ebay.ship_cost || 0) + (stats.amazon.ship_cost || 0),
      },
      {
        id: "REFUND COST",
        wa3: stats.wa3.refund_cost,
        // cawa: stats.cawa.refund_cost,
        wa2: stats.wa2.refund_cost,
        ebay: stats.ebay.refund_cost,
        amazon: stats.amazon.refund_cost,
        // // ne: stats.ne.refund_cost,
        // // nb: stats.nb.refund_cost,
        gt:
          // (stats.cawa.refund_cost || 0) +
          // (stats.ne.refund_cost || 0) +
          // (stats.nb.refund_cost || 0) +
          (stats.wa3.refund_cost || 0) +
          (stats.wa2.refund_cost || 0) +
          (stats.ebay.refund_cost || 0) + 
          (stats.amazon.refund_cost || 0),
      },
      {
        id: "COMISSION COST",
        wa3: stats.wa3.commision_cost,
        // cawa: stats.cawa.commision_cost,
        wa2: stats.wa2.commision_cost,
        ebay: stats.ebay.commision_cost,
        amazon: stats.amazon.commision_cost,
        // // ne: stats.ne.commision_cost,
        // // nb: stats.nb.commision_cost,
        gt:
          // (stats.cawa.commision_cost || 0) +
          // (stats.ne.commision_cost || 0) +
          // (stats.nb.commision_cost || 0) +
          (stats.wa3.commision_cost || 0) +
          (stats.wa2.commision_cost || 0) +
          (stats.ebay.commision_cost || 0) + 
          (stats.amazon.commision_cost || 0),
      },
      // {
      //   id: 'RETURN AMOUNT',
      //   wa3: stats.wa3.return_amount,
      // //   cawa: stats.cawa.return_amount,
      //   wa2: stats.wa2.return_amount,
      // // //   ne: stats.ne.return_amount,
      // // //   nb: stats.nb.return_amount,
      //   gt:
      //     // (stats.cawa.return_amount || 0) +
      // //     (stats.ne.return_amount || 0) +
      // //     (stats.nb.return_amount || 0) +
      //     (stats.wa3.return_amount || 0) +
      //     (stats.wa2.return_amount || 0),
      // },
      {
        id: "LOSS COST",
        wa3: stats.wa3.loss_cost,
        // cawa: stats.cawa.loss_cost,
        wa2: stats.wa2.loss_cost,
        ebay: stats.ebay.loss_cost,
        amazon: stats.amazon.loss_cost,
        // // ne: stats.ne.loss_cost,
        // // nb: stats.nb.loss_cost,
        gt:
          // (stats.cawa.loss_cost || 0) +
          // (stats.ne.loss_cost || 0) +
          // (stats.nb.loss_cost || 0) +
          (stats.wa3.loss_cost || 0) + (stats.wa2.loss_cost || 0) + (stats.ebay.loss_cost || 0) + (stats.amazon.loss_cost || 0),
      },
      {
        id: "NET PROFIT",
        wa3: stats.wa3.net_profit,
        // cawa: stats.cawa.net_profit,
        wa2: stats.wa2.net_profit,
        ebay: stats.ebay.net_profit,
        amazon: stats.amazon.net_profit,
        // // ne: stats.ne.net_profit,
        // // nb: stats.nb.net_profit,
        gt:
          // (stats.cawa.net_profit || 0) +
          // (stats.ne.net_profit || 0) +
          // (stats.nb.net_profit || 0) +
          (stats.wa3.net_profit || 0) + (stats.wa2.net_profit || 0) + (stats.ebay.net_profit || 0) + (stats.amazon.net_profit || 0),
      },
    ]);
    // eslint-disable-next-line
  }, [stats, otherReport?.response?.results]);

  // const getPercentage = (shop, index) => {
  //   const total =
  //     (statRows[index]?.wa3 >= 0 ? statRows[index]?.wa3 : 0) +
  //     (statRows[index]?.cawa >= 0 ? statRows[index]?.cawa : 0) +
  //     (statRows[index]?.wa2 >= 0 ? statRows[index]?.wa2 : 0) +
  //     (statRows[index]?.nb >= 0 ? statRows[index]?.nb : 0) +
  //     (statRows[index]?.ne >= 0 ? statRows[index]?.ne : 0);
  //   return (
  //     (100 * (statRows[index]?.[shop] > 0 ? statRows[index]?.[shop] : 0)) /
  //     total
  //   ).toFixed(1);
  // };

  // const salesData = {
  //   labels: ["Walmart", "WalmartCa", "Walmart2", "NewEgg Bussines", "NewEgg"],
  //   datasets: [
  //     {
  //       label: "Sales 2020 (M)",
  //       data: [
  //         getPercentage("wa3", 0),
  //         getPercentage("cawa", 0),
  //         getPercentage("wa2", 0),
  //         getPercentage("nb", 0),
  //         getPercentage("ne", 0),
  //       ],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(255, 255, 132, 1)",
  //         "rgba(0, 200, 0, 1)",
  //         "rgba(255, 205, 86, 1)",
  //         "rgba(54, 162, 235, 1)",
  //       ],
  //     },
  //   ],
  // };

  // const salesOptions = {
  //   title: {
  //     display: true,
  //     text: "Doughnut Chart",
  //   },
  // };

  // const netProfitData = {
  //   labels: ["Walmart", "WalmartCa", "Walmart2", "NewEgg Bussines", "NewEgg"],
  //   datasets: [
  //     {
  //       label: "Sales 2020 (M)",
  //       data: [
  //         getPercentage("wa3", 6),
  //         getPercentage("cawa", 6),
  //         getPercentage("wa2", 6),
  //         getPercentage("nb", 6),
  //         getPercentage("ne", 6),
  //       ],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(255, 255, 132, 1)",
  //         "rgba(0, 200, 0, 1)",
  //         "rgba(255, 205, 86, 1)",
  //         "rgba(54, 162, 235, 1)",
  //       ],
  //     },
  //   ],
  // };

  // const netProfitOptions = {
  //   title: {
  //     display: true,
  //     text: "Doughnut Chart",
  //   },
  // };

  return (
    <div style={{ width: "90%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer className={classes.tContainer} component={Paper}>
          <h2 className={classes.selectedText}>Selected</h2>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                {selectedHeaders?.map(item => (
                  <StyledTableCell align="right" key={item?.id}>
                    {item?.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {statRows?.map(row => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">{row.cawa?.toFixed(2) || 0}</StyledTableCell> */}
                  <StyledTableCell align="right">{row.wa2?.toFixed(2) || 0}</StyledTableCell>
                  <StyledTableCell align="right">{row.wa3?.toFixed(2) || 0}</StyledTableCell>
                  <StyledTableCell align="right">{row.ebay?.toFixed(2) || 0}</StyledTableCell>
                  <StyledTableCell align="right">{row.amazon?.toFixed(2) || 0}</StyledTableCell>
                  {/* <StyledTableCell align="right">{row.ne?.toFixed(2) || 0}</StyledTableCell> */}
                  {/* <StyledTableCell align="right">{row.nb?.toFixed(2) || 0}</StyledTableCell> */}
                  <StyledTableCell align="right">{row.gt?.toFixed(2) || 0}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div className={classes.chartDiv}>
        <div style={{ width: "40%" }}>
          <h3>Sales (%)</h3>
          <Doughnut data={salesData} options={salesOptions} />
        </div>
        <div style={{ width: "40%" }}>
          <h3>Net Profit (%)</h3>
          <Doughnut data={netProfitData} options={netProfitOptions} />
        </div>
      </div> */}
    </div>
  );
}
