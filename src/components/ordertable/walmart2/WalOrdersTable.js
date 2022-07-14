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
import { WALOrderStatus, customTopStatus } from "../../../helpers/Constants";
import TopCustomButtonGroup from "../otheritems/TopCustomStatusGroup";
import SearchField from "../otheritems/SearchField";

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
  topDiv: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function NEOrdersTable() {
  const classes = useRowStyles();
  const [buttonTag, setButtonTag] = useState("");
  const [page, setPage] = useState(0);
  const [customStatusTag, setCustomStatusTag] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { response, error, loading, setLoading } = useFetch(
    `wal2/?orderStatus=${buttonTag}&limit=${rowsPerPage}&offset=${page * rowsPerPage
    }&search=${searchKeyword}&items__tracking__status=${customStatusTag}`,
    { results: [], count: 0 },
    "http://216.128.135.6:8080/"
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoading(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setLoading(true);
  };

  const handleTagBtnClick = (event) => {
    setButtonTag(event.currentTarget.id);
    setPage(0);
    setLoading(true);
    setCustomStatusTag("");
    setSearchKeyword("");
  };

  const handleCustomBtnClick = (event) => {
    // setSearchKeyword(event.currentTarget.innerText);
    setCustomStatusTag(event.currentTarget.id);
    setPage(0);
    setLoading(true);
  };

  const globalSearch = (event, searchKey) => {
    event.preventDefault();
    setSearchKeyword(searchKey);
    setPage(0);
    setLoading(true);
  };

  let upcArray = [];
  response?.results?.forEach((item) => {
    // console.log(item?.items.length);
    // console.log(item?.items[0]?.sku);
    if (item?.items.length > 1) {
      let biggerUpcArray = [];
      item?.items?.forEach((i, ind) => {
        // console.log(ind, i?.sku);
        biggerUpcArray.push(i?.sku);
      });
      upcArray.push(biggerUpcArray);
    } else {
      upcArray.push(item?.items[0]?.sku);
    }
  });
  // console.log(upcArray);

  let customStatusArray = [];
  response?.results?.forEach((item) => {
    if (item?.items.length > 1) {
      let biggerStatusArray = [];
      item?.items?.forEach((i, ind) => {
        biggerStatusArray.push(i?.tracking?.status);
        // console.log(i?.tracking?.status);
      });
      customStatusArray.push(biggerStatusArray);
    } else {
      customStatusArray.push(item?.items[0]?.tracking?.status);
      // console.log(item?.items[0]?.tracking?.status);
    }
  });

  let idArray = [];
  response?.results?.forEach((item) => {
    if (item?.items.length > 1) {
      let biggerIdArray = [];
      item?.items?.forEach((i, ind) => {
        biggerIdArray.push(i?.id);
        // console.log(i?.tracking?.status);
      });
      idArray.push(biggerIdArray);
    } else {
      idArray.push(item?.items[0]?.id);
      // console.log(item?.items[0]?.tracking?.status);
    }
  });

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <div className={classes.topDiv}>
        <h2 className={classes.headerStyle}>Walmart-2 Orders</h2>
        <SearchField globalSearch={globalSearch} />
      </div>
      <TopButtonGroup
        buttonTag={buttonTag}
        handleTagBtnClick={handleTagBtnClick}
        orderStatusTags={WALOrderStatus}
      />
      <TopCustomButtonGroup
        buttonTag={customStatusTag}
        handleTagBtnClick={handleCustomBtnClick}
        orderStatusTags={customTopStatus}
      />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tRow}>
            <TableCell align="center" className={classes.tCell}>
              Id
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Customer Order Id
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              UPC
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Custom Status
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Customer Name
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Order Date
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Api Status
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Address 1
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Address 2
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              City
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Country
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Postal Code
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              Ship Method
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              State
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
                <Row
                  key={index}
                  row={row}
                  index={index}
                  upcArray={upcArray}
                  customStatusArray={customStatusArray}
                  idArray={idArray}
                />
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
        ) : response?.results?.length === 0 ? (
          <tbody>
            <TableNoOrders />
          </tbody>
        ) : null}
      </Table>
    </TableContainer>
  );
}
