import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Items from "./Items";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useRowStyles = makeStyles(theme => ({
  innerTable: {
    backgroundColor: "#bdd2b6",
  },
}));

const ItemsTable = ({ open, detailsRow }) => {
  const classes = useRowStyles();

  return (
    <TableRow className={classes.innerTable}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow style={{ backgroundColor: "#d6efc7" }}>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Our Price</TableCell>
                  <TableCell align="center">BuyBox</TableCell>
                  <TableCell align="center">WA Stock</TableCell>
                  <TableCell align="center">Order Status</TableCell>
                  <TableCell align="center">Tax Amount</TableCell>
                  <TableCell align="center">PO Cost</TableCell>
                  <TableCell align="center">Ship Cost</TableCell>
                  <TableCell align="center">Refund Cost</TableCell>
                  <TableCell align="center">Loss Cost</TableCell>
                  <TableCell align="center">Shipping Amount</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailsRow?.map((dRow, index) => (
                  <Items key={index} dRow={dRow} />
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
