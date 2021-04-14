import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { getData } from "../../../helpers/DataTransitions";
import { makeStyles } from "@material-ui/core/styles";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  priceStyle: {
    fontSize: "1.25rem",
  },
});

const Items = ({ dRow }) => {
  const [upcInfos, setUpcInfos] = useState();
  const classes = useStyles();

  console.log({ dRow });

  let upcQuery;
  if (dRow?.sku.includes("NC_UPC_")) {
    upcQuery = dRow.sku.replace("NC_UPC_", "");
  } else if (dRow?.sku.includes("MC_UPC_")) {
    upcQuery = dRow.sku.replace("MC_UPC_", "");
  }

  console.log(upcQuery);

  useEffect(() => {
    getData(`${BASE_URL}bb/${upcQuery}`)
      .then((response) => {
        console.log("items", response.data);
        setUpcInfos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [upcQuery]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {dRow.productName}
      </TableCell>
      <TableCell align="center">{upcQuery}</TableCell>
      <TableCell align="center">
        <p>
          <p className={classes.priceStyle}>{dRow.itemPrice}</p>
        </p>
      </TableCell>
      <TableCell align="center">
        <>
          <p className={classes.priceStyle}>{upcInfos?.salePrice}</p>
          <a href={upcInfos?.url} target="_blank" rel="noreferrer">
            Visit
          </a>
        </>
      </TableCell>
      <TableCell align="center">{upcInfos?.shippingCost}</TableCell>
      <TableCell align="center">{dRow.orderStatus}</TableCell>
      <TableCell align="right">{dRow?.taxAmount}</TableCell>
      <TableCell align="center" style={{ maxWidth: 500 }}>
        {dRow.taxName}
      </TableCell>
      <TableCell align="right">
        {upcInfos?.onlineAvailability ? "Yes" : "No"}
      </TableCell>
    </TableRow>
  );
};

export default Items;
