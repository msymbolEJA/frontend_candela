import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { getData } from "../../../helpers/DataTransitions";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Items = ({ dRow }) => {
  const [upcInfos, setUpcInfos] = useState();

  const upcQuery = dRow.UPCCode || dRow.SellerPartNumber.replace("NC_UPC_", "");

  useEffect(() => {
    getData(`${BASE_URL}bb/${upcQuery}`).then((response) => {
      console.log(response.data);
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
      <TableCell align="center">{dRow.UnitPrice}</TableCell>
      <TableCell align="center" style={{ maxWidth: 200 }}>
        {dRow.Description}
      </TableCell>
      <TableCell align="center">{upcInfos?.salePrice}</TableCell>
      <TableCell align="center">{upcInfos?.shippingCost}</TableCell>
      <TableCell align="right">
        {upcInfos?.onlineAvailability ? "Yes" : "No"}
      </TableCell>
    </TableRow>
  );
};

export default Items;
