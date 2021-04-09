import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import moment from "moment";
import ItemsTable from "./ItemsTable";

const useRowStyles = makeStyles({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#feffde",
    },
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
  innerTable: {
    backgroundColor: "#bdd2b6",
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const detailsRow = row.items;
  //   console.log(detailsRow);

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
        <TableCell align="center">
          {moment.utc(row.OrderDate).local().format("MM-DD-YY HH:mm")}
        </TableCell>
        <TableCell align="center">{row.OrderStatusDescription}</TableCell>
        <TableCell align="center">{row.OrderItemAmount}</TableCell>
        <TableCell align="center">{row.OrderQty}</TableCell>
        <TableCell align="right">{row.OrderTotalAmount}</TableCell>
      </TableRow>
      <TableRow className={classes.innerTable}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h4" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#96bb7c" }}>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="center">Customer Phone Number</TableCell>
                    <TableCell align="center">Discount Amount</TableCell>
                    <TableCell align="center">Invoice Number</TableCell>
                    <TableCell align="center">Order Status</TableCell>
                    <TableCell align="center">Refund Amount</TableCell>
                    <TableCell align="center">Sales Tax</TableCell>
                    <TableCell align="center">Ship Service</TableCell>
                    <TableCell align="center">Ship To Company</TableCell>
                    <TableCell align="center">ShipToAddress1</TableCell>
                    <TableCell align="center">ShipToAddress2</TableCell>
                    <TableCell align="center">ShipToAddress3</TableCell>
                    <TableCell align="center">Shipping Amount</TableCell>
                    <TableCell align="right">VAT Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.CustomerName}
                    </TableCell>
                    <TableCell>{row.CustomerPhoneNumber}</TableCell>
                    <TableCell align="center">{row.DiscountAmount}</TableCell>

                    <TableCell align="center">{row.InvoiceNumber}</TableCell>

                    <TableCell align="center">{row.OrderStatus}</TableCell>
                    <TableCell align="center">{row.RefundAmount}</TableCell>
                    <TableCell align="center">{row.SalesTax}</TableCell>
                    <TableCell align="center">{row.ShipService}</TableCell>
                    <TableCell align="center">
                      {row.ShipToCompany ? row.ShipToCompany : "-"}
                    </TableCell>
                    <TableCell align="center">{row.ShipToAddress1}</TableCell>
                    <TableCell align="center">{row.ShipToAddress2}</TableCell>
                    <TableCell align="center">
                      <>
                        {row.ShipToCityName}
                        <br />
                        {row.ShipToStateCode}
                        <br />
                        {row.ShipToCountryCode}
                        <br />
                        {row.ShipToZipCode}
                      </>
                    </TableCell>

                    <TableCell align="center">{row.ShippingAmount}</TableCell>
                    <TableCell align="right">
                      {row.VATTotal ? row.VATTotal : "-"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ItemsTable open={open} detailsRow={detailsRow} />
    </React.Fragment>
  );
}

export default Row;
