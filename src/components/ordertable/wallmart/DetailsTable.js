import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import ItemsTable from "./ItemsTable";
import OrderTracking from "../otheritems/OrderTracking";

const useRowStyles = makeStyles({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: "#feffde",
    // },
    "& > *": {
      borderBottom: "unset",
    },
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#DDFFBC",
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
  upcStyle: {
    fontWeight: "normal",
  },
});

function Row(props) {
  const { row, index, upcArray, customStatusArray, idArray } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const detailsRow = row.items;

  // console.log(upcArray[index]);
  // console.log(upcArray);
  // console.log(index);

  const upcEditFunc = (singleUpc) => {
    return Array.isArray(singleUpc)
      ? singleUpc?.map((item, index) => (
          <p key={index} className={classes.upcStyle}>
            {item?.replace("MC_UPC_", "").replace("NC_UPC_", "")}
          </p>
        ))
      : singleUpc?.replace("MC_UPC_", "").replace("NC_UPC_", "");
  };

  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        style={{
          backgroundColor:
            customStatusArray[index] === "Awaiting-fulfillment"
              ? "#FFF5DA"
              : customStatusArray[index] === "Cancelled"
              ? "#FF7171"
              : customStatusArray[index] === "Error"
              ? "#8F4068"
              : customStatusArray[index] === "Late-shipment"
              ? "#B590CA"
              : customStatusArray[index] === "Ordered"
              ? "#F3D1F4"
              : customStatusArray[index] === "Refund/return"
              ? "#C06C84"
              : customStatusArray[index] === "Shipped"
              ? "#C68B59"
              : customStatusArray[index] === "Stock"
              ? "#BE8ABF"
              : customStatusArray[index] === "ZZZ"
              ? "#8AC6D1"
              : customStatusArray[index] === "Ready"
              ? "#32AFA9"
              : customStatusArray[index] === "Partial-refund"
              ? "#445C3C"
              : customStatusArray[index] === "Reserved"
              ? "#F7DAD9"
              : customStatusArray[index] === "Label Purchased"
              ? "#FFC947"
              : customStatusArray[index] === "Other"
              ? "#DBE9B7"
              : "bdd2b6",
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell align="center" component="th" scope="row">
          {idArray[index]}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.customerOrderId ? (
            <>
              <p>{row.customerOrderId}</p>
              <a href={row.ordoroUrl} target="_blank" rel="noreferrer">
                Visit
              </a>
            </>
          ) : (
            <p>No Info</p>
          )}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {upcEditFunc(upcArray[index])}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {customStatusArray[index]}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.cutomerName}
        </TableCell>
        <TableCell align="center">
          {moment.utc(row.orderDate).local().format("MM-DD-YY HH:mm")}
        </TableCell>
        <TableCell align="center">{row.orderStatus}</TableCell>
        <TableCell align="center">{row.address1}</TableCell>
        <TableCell align="center">
          {row.address2 ? row.address2 : "No Info"}
        </TableCell>
        <TableCell align="center">{row.city}</TableCell>
        <TableCell align="center">{row.country}</TableCell>
        <TableCell align="center">{row.postalCode}</TableCell>
        <TableCell align="center">{row.shipMethod}</TableCell>
        <TableCell align="center">{row.state}</TableCell>
      </TableRow>
      <ItemsTable open={open} detailsRow={detailsRow} />
      {detailsRow?.map((detRow, index) => (
        <OrderTracking open={open} detRow={detRow} key={index} store={"wal"} />
      ))}
    </React.Fragment>
  );
}

export default Row;
