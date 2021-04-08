import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const ItemsTable = ({ open, detailsRow }) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
              Items
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow style={{ backgroundColor: "#e8eae6" }}>
                  <TableCell>Id</TableCell>
                  <TableCell>SellerPartNumber</TableCell>
                  <TableCell align="center">UPCCode</TableCell>
                  <TableCell align="center">OrderedQty</TableCell>
                  <TableCell align="center">UnitPrice</TableCell>
                  <TableCell align="right">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailsRow?.map((dRow, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {dRow.id}
                    </TableCell>
                    <TableCell>{dRow.SellerPartNumber}</TableCell>
                    <TableCell align="center">
                      {dRow.UPCCode ? dRow.UPCCode : "-"}
                    </TableCell>
                    <TableCell align="center">{dRow.OrderedQty}</TableCell>
                    <TableCell align="center">{dRow.UnitPrice}</TableCell>
                    <TableCell align="right">{dRow.Description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default ItemsTable;
