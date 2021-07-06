import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Row from "./DetailsTable";
import TopButtonGroup from "../otheritems/TabButtonGroup";
import useFetch from "../../../hooks/useFetch";
import { TableLoadingSpinner } from "../../../helpers/LoadingSpinners";
import { TableNoOrders } from "../../../helpers/NoOrders";
import { TableError } from "../../../helpers/Errors";
import CustomTableFooter from "../otheritems/CustomTableFooter";
import { NEOrderStatus } from "../../../helpers/Constants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tContainer: {
    marginLeft: "60px",
    width: `calc(100% - ${60}px)`,
  },
  tRow: {
    backgroundColor: "#52734d",
  },
  tCell: {
    color: "white",
  },
  headerStyle: {
    color: "#1f441e",
    fontSize: "2rem",
    fontFamily: "Courier New",
  },
});

export default function NEOrdersTable() {
  const classes = useRowStyles();
  const [buttonTag, setButtonTag] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { response, error, loading, setLoading } = useFetch(
    `${BASE_URL}ne/?OrderStatus=${buttonTag}&limit=${rowsPerPage}&offset=${
      page * rowsPerPage
    }`,
    { results: [], count: 0 }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoading(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setLoading(true);
  };

  const handleTagBtnClick = (event) => {
    setButtonTag(event.currentTarget.id);
    setPage(0);
    setLoading(true);
  };

  let upcArray = [];
  response?.results?.forEach((item) => {
    if (item?.items.length > 1) {
      let biggerUpcArray = [];
      item?.items?.forEach((i, ind) => {
        biggerUpcArray.push(i?.SellerPartNumber);
      });
      upcArray.push(biggerUpcArray);
    } else {
      upcArray.push(item?.items[0]?.SellerPartNumber);
    }
  });

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <h2 className={classes.headerStyle}>New Egg Orders</h2>
      <TopButtonGroup
        buttonTag={buttonTag}
        handleTagBtnClick={handleTagBtnClick}
        orderStatusTags={NEOrderStatus}
      />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tRow}>
            <TableCell align="center" className={classes.tCell}>
              Order Number
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              UPC
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Date
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Api Status Description
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Item Amount
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Qty
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Total Amount
            </TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <tbody>
            <TableLoadingSpinner />
          </tbody>
        ) : error ? (
          <tbody>
            <TableError />
          </tbody>
        ) : response?.results?.length > 0 ? (
          <>
            <TableBody>
              {response?.results?.map((row, index) => (
                <Row key={index} row={row} upcArray={upcArray} index={index} />
              ))}
            </TableBody>
            <CustomTableFooter
              response={response}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </>
        ) : (
          <tbody>
            <TableNoOrders />
          </tbody>
        )}
      </Table>
    </TableContainer>
  );
}
