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

const useRowStyles = makeStyles({
  innerTable: {
    backgroundColor: "#bdd2b6",
  },
});

const ItemsTable = ({ open, detailsRow }) => {
  const classes = useRowStyles();
  // console.log(detailsRow);
  // console.log(detailsRow[0]?.SellerPartNumber.includes("MC"));

  return (
    <TableRow className={classes.innerTable}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={18}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h4" gutterBottom component="div">
              Items
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow style={{ backgroundColor: "#d6efc7" }}>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Seller Part Number</TableCell>
                  <TableCell align="center">UPC Code</TableCell>
                  <TableCell align="center">Ordered Qty</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">
                    {detailsRow[0]?.SellerPartNumber?.includes("MC")
                      ? "Micro Center Price"
                      : detailsRow[0]?.SellerPartNumber?.includes("AC")
                      ? "Amazon Price"
                      : detailsRow[0]?.SellerPartNumber?.includes("ML")
                      ? "Malabs Price"
                      : "BestBuy Price"}
                  </TableCell>
                  <TableCell align="center">Price Update Date</TableCell>
                  <TableCell align="center">BestBuy Shipping Cost</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">
                    BestBuy Online Availibility
                  </TableCell>
                  <TableCell align="center">
                    Online Availability Update Date
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
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
