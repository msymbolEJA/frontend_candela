import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import checkSvg from "../../../assets/check.svg";
import warnSvg from "../../../assets/warn.svg";
import useFetch from "../../../hooks/useFetch";
import moment from "moment";

const useStyles = makeStyles({
  priceStyle: {
    fontSize: "1.25rem",
  },
  oldPrice: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
});

const Items = ({ dRow }) => {
  const classes = useStyles();
  const { response } = useFetch(
    `${
      dRow?.SellerPartNumber?.includes("MC")
        ? "mc"
        : dRow?.SellerPartNumber.includes("AC")
        ? "amz"
        : dRow?.SellerPartNumber.includes("ML")
        ? "mlab"
        : "bb"
    }/${dRow.SellerPartNumber?.replace("NC_UPC_", "")
      ?.replace("MC_UPC_", "")
      ?.replace("AC_UPC_", "")}`
  );

  // console.log(dRow?.SellerPartNumber.includes("MC"));
  // console.log(response);

  let isBuyable =
    Number(dRow?.UnitPrice) / 1.3 >
      Number(response?.salePrice) + Number(response?.shippingCost) &&
    response?.onlineAvailability;

  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        {dRow.id}
      </TableCell>
      <TableCell align="center">{dRow.SellerPartNumber}</TableCell>
      <TableCell align="center">
        {dRow.SellerPartNumber
          ? dRow.SellerPartNumber.replace("NC_UPC_", "").replace("MC_UPC_", "")
          : dRow.UPCCode
          ? dRow.UPCCode
          : "-"}
      </TableCell>
      <TableCell align="center">{dRow.OrderedQty}</TableCell>
      <TableCell align="center">
        <>
          <p className={classes.priceStyle}>{dRow.UnitPrice}</p>
          <a href={dRow.url} target="_blank" rel="noreferrer">
            Visit
          </a>
        </>
      </TableCell>
      <TableCell align="center">
        <>
          <p className={classes.oldPrice}>
            {response?.pre_salePrice ? response?.pre_salePrice : null}
          </p>
          <p className={classes.priceStyle}>
            {response?.salePrice ? response?.salePrice : "-"}
          </p>
          {response?.url ? (
            <a href={response?.url} target="_blank" rel="noreferrer">
              Visit
            </a>
          ) : null}
        </>
      </TableCell>
      <TableCell align="center">
        {moment.utc(response?.priceUpdateDate).local().format("MM-DD-YY HH:mm")}
      </TableCell>
      <TableCell align="center">{response?.shippingCost}</TableCell>
      <TableCell align="center" style={{ maxWidth: 500 }}>
        {dRow.Description}
      </TableCell>
      <TableCell align="center">
        {response?.onlineAvailability ? "Yes" : "No"}
      </TableCell>
      <TableCell align="center">
        {moment
          .utc(response?.onlineAvailabilityUpdateDate)
          .local()
          .format("MM-DD-YY HH:mm")}
      </TableCell>
      <TableCell align="center">
        <img
          src={isBuyable ? checkSvg : warnSvg}
          style={{ width: 25 }}
          alt=""
        />
      </TableCell>
    </TableRow>
  );
};

export default Items;
