import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { getData } from "../../../helpers/DataTransitions";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tContainer: {
    marginLeft: "75px",
    width: `calc(100% - ${75}px)`,
  },
  tRow: {
    backgroundColor: "#52734d",
  },
  tCell: {
    color: "white",
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  console.log(row.items);

  const detailsRow = row.items;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.OrderNumber}
        </TableCell>
        <TableCell align="center">{row.OrderDate}</TableCell>
        <TableCell align="center">{row.OrderStatusDescription}</TableCell>
        <TableCell align="center">{row.OrderItemAmount}</TableCell>
        <TableCell align="center">{row.OrderQty}</TableCell>
        <TableCell align="right">{row.OrderTotalAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: "lightgrey" }}>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">Customer Phone Number</TableCell>
                    <TableCell align="right">Discount Amount</TableCell>
                    <TableCell align="right">Duty Total</TableCell>
                    <TableCell align="right">Fulfillment Option</TableCell>
                    <TableCell align="right">Invoice Number</TableCell>
                    <TableCell align="right">Is Auto Void</TableCell>
                    <TableCell align="right">Order Status</TableCell>
                    <TableCell align="right">Refund Amount</TableCell>
                    <TableCell align="right">Sales Channel</TableCell>
                    <TableCell align="right">Sales Tax</TableCell>
                    <TableCell align="right">Ship Service</TableCell>
                    <TableCell align="right">ShipToAddress1</TableCell>
                    <TableCell align="right">ShipToAddress2</TableCell>
                    <TableCell align="right">Ship To City Name</TableCell>
                    <TableCell align="right">Ship To Company</TableCell>
                    <TableCell align="right">Ship To Country Code</TableCell>
                    <TableCell align="right">Ship To State Code</TableCell>
                    <TableCell align="right">Ship To Zip Code</TableCell>
                    <TableCell align="right">Shipping Amount</TableCell>
                    <TableCell align="right">VAT Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.CustomerName}
                    </TableCell>
                    <TableCell>{row.CustomerPhoneNumber}</TableCell>
                    <TableCell align="right">{row.DiscountAmount}</TableCell>
                    <TableCell align="right">{row.DutyTotal}</TableCell>
                    <TableCell align="right">{row.FulfillmentOption}</TableCell>
                    <TableCell align="right">{row.InvoiceNumber}</TableCell>
                    <TableCell align="right">{row.IsAutoVoid}</TableCell>
                    <TableCell align="right">{row.OrderStatus}</TableCell>
                    <TableCell align="right">{row.RefundAmount}</TableCell>
                    <TableCell align="right">{row.SalesChannel}</TableCell>
                    <TableCell align="right">{row.SalesTax}</TableCell>
                    <TableCell align="right">{row.ShipService}</TableCell>
                    <TableCell align="right">{row.ShipToAddress1}</TableCell>
                    <TableCell align="right">{row.ShipToAddress2}</TableCell>
                    <TableCell align="right">{row.ShipToCityName}</TableCell>
                    <TableCell align="right">{row.ShipToCompany}</TableCell>
                    <TableCell align="right">{row.ShipToCountryCode}</TableCell>
                    <TableCell align="right">{row.ShipToStateCode}</TableCell>
                    <TableCell align="right">{row.ShipToZipCode}</TableCell>
                    <TableCell align="right">{row.ShippingAmount}</TableCell>
                    <TableCell align="right">{row.VATTotal}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#e8eae6" }}>
                    <TableCell>Id</TableCell>
                    <TableCell>SellerPartNumber</TableCell>
                    <TableCell align="right">UPCCode</TableCell>
                    <TableCell align="right">OrderedQty</TableCell>
                    <TableCell align="right">UnitPrice</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailsRow?.map((dRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {dRow.id}
                      </TableCell>
                      <TableCell>{dRow.SellerPartNumber}</TableCell>
                      <TableCell align="right">{dRow.UPCCode}</TableCell>
                      <TableCell align="right">{dRow.OrderedQty}</TableCell>
                      <TableCell align="right">{dRow.UnitPrice}</TableCell>
                      <TableCell align="right">{dRow.Description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// name, calories, fat, carbs, protein, price

export default function NEOrdersTable() {
  const [tableData, setTableData] = useState();
  const classes = useRowStyles();

  useEffect(() => {
    getData(`${BASE_URL}ne/?limit=100&offset=0`).then((response) => {
      console.log(response.data);
      setTableData({
        ...tableData,
        rows: response.data.results,
        count: response.data.count,
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <h2>New Egg</h2>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tRow}>
            <TableCell />
            <TableCell className={classes.tCell}>OrderNumber</TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderDate
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderStatusDescription
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderItemAmount
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              OrderQty
            </TableCell>
            <TableCell align="right" className={classes.tCell}>
              OrderTotalAmount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.rows?.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
