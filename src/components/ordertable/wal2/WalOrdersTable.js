/* eslint-disable react-hooks/rules-of-hooks */
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
import { WAL_OrderStatus, customTopStatus, fullfilmentTypes } from "../../../helpers/Constants";
import TopCustomButtonGroup from "../otheritems/TopCustomStatusGroup";
import SearchField from "../otheritems/SearchField";
import DateFilter from "../../../helpers/DateFilter";
import { Button, Checkbox } from "@material-ui/core";
import TopFullfilmentTypeButtonGroup from "../otheritems/TopFullfilmentTypeButtonGroup";

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
  meteButton: {
    marginBottom: 13,
    fontSize: 12.5,
    padding: "2px 15px",
    borderRadius: " 20px 10px 20px 10px ",
    boxShadow: "1px 2px 2px 1px #345C7C",
    letterSpacing: 0.5,
    transition: "1s ease all",
    backgroundColor: "#0BB68A",
    color: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#5ee0bf",
    },
  },
});

export default function wal2OrdersTable() {
  const classes = useRowStyles();
  const [buttonTag, setButtonTag] = useState("");
  const [dates, setDates] = useState({
    end_date: "",
    start_date: "",
  });
  const [page, setPage] = useState(0);
  const [customStatusTag, setCustomStatusTag] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isShowMete, setIsShowMete] = useState(false);
  const [fullfilment_type, setFullfilment_type] = useState("all");

  console.log(fullfilment_type);
  const { response, error, loading, setLoading } = useFetch(
    `wal2/new?orderStatus=${buttonTag}&limit=${rowsPerPage}&offset=${
      page * rowsPerPage
    }&search=${searchKeyword}&items__tracking__status=${customStatusTag}&end_date=${
      dates.end_date
    }&start_date=${dates.start_date}${isShowMete ? "&sku=METE" : ""}&fullfilment_type=${
      fullfilment_type === "wf"
        ? "WFSFulfilled"
        : fullfilment_type === "sf"
        ? "SellerFulfilled"
        : ""
    }`,
    { results: [], count: 0 },
    process.env.REACT_APP_CANDELA_2_URL,
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoading(true);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setLoading(true);
  };

  const handleTagBtnClick = event => {
    setButtonTag(event.currentTarget.id);
    setPage(0);
    setLoading(true);
    setCustomStatusTag("");
    setSearchKeyword("");
  };

  const handleTypeBtnClick = event => {
    setFullfilment_type(event.currentTarget.id);
    setPage(0);
    setLoading(true);
    // setCustomStatusTag("");
    setSearchKeyword("");
  };

  const handleCustomBtnClick = event => {
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

  const handleMete = () => {
    setIsShowMete(!isShowMete);
    setLoading(true);
  };

  let upcArray = [];
  response?.results?.forEach(item => {
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
  response?.results?.forEach(item => {
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
  response?.results?.forEach(item => {
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

  const excelDownload = () => {
    window.open(
      `${
        process.env.REACT_APP_CANDELA_2_URL
      }wal2/generate-excell?orderStatus=${buttonTag}&search=${searchKeyword}&items__tracking__status=${customStatusTag}&end_date=${
        dates.end_date
      }&start_date=${dates.start_date}${isShowMete ? "&sku=METE" : ""}&fullfilment_type=${
        fullfilment_type === "wf"
          ? "WFSFulfilled"
          : fullfilment_type === "sf"
          ? "SellerFulfilled"
          : ""
      }`,
      "_self",
    );
  };

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <div className={classes.topDiv}>
        <h2 className={classes.headerStyle}>Walmart 2 Orders</h2>
        <SearchField globalSearch={globalSearch} />
      </div>
      <DateFilter dates={dates} setDates={setDates} excelDownload={excelDownload} />

      <Button onClick={handleMete} className={classes.meteButton}>
        <Checkbox checked={isShowMete} color="primary" />
        Show Mete Orders
      </Button>

      <TopFullfilmentTypeButtonGroup
        buttonTag={fullfilment_type}
        handleTagBtnClick={handleTypeBtnClick}
        orderStatusTags={fullfilmentTypes}
      />
      <TopButtonGroup
        buttonTag={buttonTag}
        handleTagBtnClick={handleTagBtnClick}
        orderStatusTags={WAL_OrderStatus}
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
              CO
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              SKU
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              UPC / GTIN
            </TableCell>
            <TableCell align="center" className={classes.tCell}>
              PO
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
