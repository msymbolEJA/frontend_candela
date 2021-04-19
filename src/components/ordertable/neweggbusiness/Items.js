import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { getData } from "../../../helpers/DataTransitions";
import { makeStyles } from "@material-ui/core/styles";
import checkSvg from "../../../assets/check.svg";
import warnSvg from "../../../assets/warn.svg";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  priceStyle: {
    fontSize: "1.25rem",
  },
});

const Items = ({ dRow }) => {
  const [upcInfos, setUpcInfos] = useState();
  const classes = useStyles();

  const upcQuery = dRow.SellerPartNumber.replace("NC_UPC_", "");

  useEffect(() => {
    getData(`${BASE_URL}bb/${upcQuery}`).then((response) => {
      // console.log("items", response.data);
      setUpcInfos(response.data);
    });
  }, [upcQuery]);

  let isBuyable =
    Number(dRow?.UnitPrice) / 1.3 >
      Number(upcInfos?.salePrice) + Number(upcInfos?.shippingCost) &&
    upcInfos?.onlineAvailability;
  // console.log({ isBuyable });

  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        {dRow.id}
      </TableCell>
      <TableCell align="center">{dRow.SellerPartNumber}</TableCell>
      <TableCell align="center">
        {dRow.UPCCode
          ? dRow.UPCCode
          : dRow.SellerPartNumber
          ? dRow.SellerPartNumber.replace("NC_UPC_", "")
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
          <p className={classes.priceStyle}>
            {upcInfos?.salePrice ? upcInfos?.salePrice : "-"}
          </p>
          {upcInfos?.url ? (
            <a href={upcInfos?.url} target="_blank" rel="noreferrer">
              Visit
            </a>
          ) : null}
        </>
      </TableCell>
      <TableCell align="center">{upcInfos?.shippingCost}</TableCell>
      <TableCell align="center" style={{ maxWidth: 500 }}>
        {dRow.Description}
      </TableCell>
      <TableCell align="center">
        {upcInfos?.onlineAvailability ? "Yes" : "No"}
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
