import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const Items = ({ dRow }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {dRow.productName}
      </TableCell>
      <TableCell>{dRow.itemPrice}</TableCell>
      <TableCell align="center">{dRow.orderStatus}</TableCell>
      <TableCell align="center">{dRow?.sku}</TableCell>
      <TableCell align="right">{dRow?.taxAmount}</TableCell>
      <TableCell align="center" style={{ maxWidth: 500 }}>
        {dRow.taxName}
      </TableCell>
    </TableRow>
  );
};

export default Items;
