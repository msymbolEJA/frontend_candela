import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import ItemsTable from "./ItemsTable";
import OrderTracking from "../otheritems/OrderTracking";
import { bgColorSetter, upcEditFunc } from "../../../helpers/functions";
import { WAL_OrderStatus } from "../../../helpers/Constants";
import CustomUPCComponent from "../otheritems/CustomUPCComponent";

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

  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        style={{
          backgroundColor: row.fullfilment_type === "WFSFulfilled" ? "#fdfa66" : bgColorSetter(customStatusArray[index]),
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
          {upcEditFunc(upcArray[index], classes).map((item, i) => (
            <CustomUPCComponent
              item={item}
              in_stock={detailsRow?.[i]?.in_stock}
            />
          ))}
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
        <TableCell align="center">
          {WAL_OrderStatus.find((item) => item.id === row.orderStatus)?.status}
        </TableCell>

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
      {console.log(detailsRow)}
      {detailsRow?.map((detRow, index) => (
        <OrderTracking
          open={open}
          detRow={{ ...detRow, fullfilment_type: row.fullfilment_type }}
          key={index}
          store={"wal3"}
          base={process.env.REACT_APP_CANDELA_3_URL}
        />
      ))}
    </React.Fragment>
  );
}

export default Row;
