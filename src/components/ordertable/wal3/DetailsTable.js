import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import ItemsTable from "./ItemsTable";
import OrderTracking from "../otheritems/OrderTracking";
import { bgColorSetter2, upcEditFunc } from "../../../helpers/functions";
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
          backgroundColor:
            row?.fullfilment_type === "WFSFulfilled"
              ? row?.items?.length <= 1
                ? "#fdfa66"
                : row?.items?.every((item, index, arr) => item?.tracking?.status === arr[0]?.tracking?.status)
                  ? "#fdfa66"
                  : "#91c788"
              :detailsRow?.[0]?.orderStatus?.includes("Cancelled") ? "#FF7171" : bgColorSetter2(customStatusArray[index])
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell align="center" component="th" scope="row">
          {Array.isArray(idArray[index])
            ? idArray[index]?.map(item => (
              <>
                {item} <br />
              </>
            ))
            : idArray[index]}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {/* Customer Order Id */}
          {row.customerOrderId ? (
            <>
              <p>{row.customerOrderId}</p>
            </>
          ) : (
            <p>No Info</p>
          )}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {/* SKU */}

          {upcEditFunc(upcArray[index], classes).map((item, i) => (
            <CustomUPCComponent
              item={item}
              in_stock={detailsRow?.[i]?.in_stock}
              link={detailsRow?.[i]?.wa_ss_link}
            />
          ))}
        </TableCell>

        <TableCell align="center" component="th" scope="row">
          {row?.items
            ?.map(item => item.gtin || item.upc)
            .map((item, i) => (
              <CustomUPCComponent
                item={item}
                in_stock={detailsRow?.[i]?.in_stock}
                link={detailsRow?.[i]?.wa_link}
              />
            ))}
        </TableCell>

        <TableCell align="center" component="th" scope="row">
          {row?.purchaseOrderId}
        </TableCell>

        <TableCell align="center" component="th" scope="row">
          {Array.isArray(customStatusArray[index])
            ? customStatusArray[index]?.map(item => (
              <>
                {item} <br />
              </>
            ))
            : customStatusArray[index]}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.cutomerName}
        </TableCell>
        <TableCell align="center">
          {moment.utc(row.orderDate).local().format("MM-DD-YY HH:mm")}
        </TableCell>
        <TableCell align="center">
          {WAL_OrderStatus.find(item => item.id === row.orderStatus)?.status}
        </TableCell>

        <TableCell align="center">
          {row.shipMethod}
          <br />
          <a href={row.ordoroUrl} target="_blank" rel="noreferrer">
            Visit
          </a>
        </TableCell>
        <TableCell align="center">{row.state}</TableCell>
      </TableRow>
      <ItemsTable open={open} detailsRow={detailsRow} row={row} />
      {/* {detailsRow?.map((detRow, index) => (
        <OrderTracking
          open={open}
          detRow={{ ...detRow, fullfilment_type: row?.fullfilment_type }}
          key={index}
          store={'wal3'}
          base={process.env.REACT_APP_CANDELA_3_URL}
        />
      ))} */}
    </React.Fragment>
  );
}

export default Row;
