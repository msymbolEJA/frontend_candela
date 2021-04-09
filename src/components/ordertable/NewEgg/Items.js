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

  const upcQuery = dRow.UPCCode || dRow.SellerPartNumber.replace("NC_UPC_", "");

  useEffect(() => {
    getData(`${BASE_URL}bb/${upcQuery}`).then((response) => {
      console.log("items", response.data);
      setUpcInfos(response.data);
    });
  }, [upcQuery]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {dRow.id}
      </TableCell>
      <TableCell>{dRow.SellerPartNumber}</TableCell>
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
          <p className={classes.priceStyle}>{upcInfos?.salePrice}</p>
          <a href={upcInfos?.url} target="_blank" rel="noreferrer">
            Visit
          </a>
        </>
      </TableCell>
      <TableCell align="center">{upcInfos?.shippingCost}</TableCell>
      <TableCell align="right">
        {upcInfos?.onlineAvailability ? "Yes" : "No"}
      </TableCell>
      <TableCell align="center" style={{ maxWidth: 500 }}>
        {dRow.Description}
      </TableCell>
    </TableRow>
  );
};

export default Items;
