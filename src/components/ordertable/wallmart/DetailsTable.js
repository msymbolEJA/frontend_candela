import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
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
  console.log(detailsRow);

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
          {row.customerOrderId}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.cutomerName}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.customerEmailId ? (
            row.customerEmailId
          ) : (
            <p style={{ color: "red" }}>No Info</p>
          )}
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
            <p style={{ color: "red" }}>No Info</p>
          )}
        </TableCell>
        <TableCell align="center">
          {moment.utc(row.OrderDate).local().format("MM-DD-YY HH:mm")}
        </TableCell>
        <TableCell align="center">{row.orderStatus}</TableCell>
        <TableCell align="center">{row.address1}</TableCell>
        <TableCell align="center">
          {row.address2 ? (
            row.address2
          ) : (
            <p style={{ color: "red" }}>No Info</p>
          )}
        </TableCell>
        <TableCell align="right">{row.addressType}</TableCell>
        <TableCell align="right">{row.city}</TableCell>
        <TableCell align="right">{row.country}</TableCell>
        <TableCell align="right">{row.postalCode}</TableCell>
        <TableCell align="right">{row.shipMethod}</TableCell>
        <TableCell align="right">{row.state}</TableCell>
      </TableRow>
      <ItemsTable open={open} detailsRow={detailsRow} />
    </React.Fragment>
  );
}

export default Row;
