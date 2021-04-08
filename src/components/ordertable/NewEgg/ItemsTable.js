import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Items from "./Items";

const ItemsTable = ({ open, detailsRow }) => {
  // console.log(detailsRow.length);

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
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">BestBuy Price</TableCell>
                  <TableCell align="center">BestBuy Shipping Cost</TableCell>
                  <TableCell align="right">
                    BestBuy Online Availibility
                  </TableCell>
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
