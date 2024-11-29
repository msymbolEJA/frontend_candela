import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import checkSvg from "../../../assets/check.svg";
import warnSvg from "../../../assets/warn.svg";
import useFetch from "../../../hooks/useFetch";
import moment from "moment";
import { OrderFormSelect } from "../../../helpers/Constants";
import CustomAutoComplete from "../otheritems/CustomAutoComplete";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import api from "../../../helpers/api";

const useStyles = makeStyles(theme => ({
  priceStyle: {
    fontSize: "1.25rem",
  },
  oldPrice: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
  btnSave: {
    margin: theme.spacing(1.3),
    color: "#52734d",
    borderColor: "#52734d",
    backgroundColor: "#fad586",
    "&:hover": {
      color: "#fad586",
      backgroundColor: "#52734d",
    },
  },
  btnLog: {
    margin: theme.spacing(1.3),
    color: "#fad586",
    borderColor: "#52734d",
    backgroundColor: "#52734d",
    "&:hover": {
      color: "#52734d",
      backgroundColor: "#fad586",
    },
  },
}));

const Items = ({ dRow }) => {
  const classes = useStyles();
  let history = useHistory();
  const base = process.env.REACT_APP_CANDELA_3_URL;

  const [formInfo, setFormInfo] = useState({
    id: null,
    item: null,
    error_reason: null,
    other: null,
    so_info: null,
    stock_cost: null,
    status: null,
    user_ship_note: null,
    po_cost: null,
    ship_cost: null,
    refund_cost: null,
    loss_cost: null,
    return_amount: null,
  });

  const handleFormSend = () => {
    api(`amazon/ordertrack/${dRow?.id}`, "put", formInfo, base);
  };

  useEffect(() => {
    setFormInfo(dRow?.tracking);
    return;
  }, [dRow]);

  const handleGotoLog = () => {
    history.push(`/log-table/amazon/${dRow?.OrderNumber || dRow?.customerOrderId}`);
  };

  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        {[
          {
            label: "Status",
            name: "status",
            selectArray: [
              { id: 1, status: "Shipped" },
              { id: 2, status: "ZZZ" },
              { id: 3, status: "Reserved" },
              { id: 4, status: "Stock" },
              { id: 5, status: "Error" },
              { id: 6, status: "Late-Shipment" },
              { id: 7, status: "Cancelled" },
              { id: 8, status: "Returned Supplier" },
              { id: 9, status: "Returned Stocked" },
              { id: 10, status: "Fake Refund" },
              { id: 11, status: "Dispute" },
              { id: 12, status: "Shipsurance" },
              { id: 13, status: "Other" },
            ],
          },
        ]?.map((order, index) => (
          <div key={index}>
            <CustomAutoComplete
              style={{ minWidth: 110, width: 110 }}
              order={order}
              setFormInfo={setFormInfo}
              formInfo={formInfo}
            />
          </div>
        ))}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {dRow?.title}
      </TableCell>
      <TableCell align="center">
        <p className={classes.priceStyle}>{dRow?.lineItemCost}</p>
      </TableCell>
      <TableCell align="center" component="th" scope="row">
       {dRow?.quantity}
      </TableCell>

      <TableCell align="center" component="th" scope="row">
        {dRow?.amazon_stock}{" "}
      </TableCell>

      <TableCell align="center">{dRow?.fulfillmentStatus}</TableCell>
      <TableCell align="center">{dRow?.taxAmount}</TableCell>

      <TableCell align="center">
        {[
          {
            label: "Po Cost",
            name: "po_cost",
            type: "number",
            selectArray: [],
          },
        ]?.map((order, index) => (
          <div key={index}>
            <CustomAutoComplete
              style={{ minWidth: 110, width: 110 }}
              order={order}
              setFormInfo={setFormInfo}
              formInfo={formInfo}
            />
          </div>
        ))}
      </TableCell>

      <TableCell align="center">
        {[
          {
            label: "Ship Cost",
            name: "ship_cost",
            type: "number",
            selectArray: [],
          },
        ]?.map((order, index) => (
          <div key={index}>
            <CustomAutoComplete
              style={{ minWidth: 110, width: 110 }}
              order={order}
              setFormInfo={setFormInfo}
              formInfo={formInfo}
            />
          </div>
        ))}
      </TableCell>

      <TableCell align="center">
        {[
          {
            label: "Refund Cost",
            name: "refund_cost",
            type: "number",
            selectArray: [],
          },
        ]?.map((order, index) => (
          <div key={index}>
            <CustomAutoComplete
              style={{ minWidth: 110, width: 110 }}
              order={order}
              setFormInfo={setFormInfo}
              formInfo={formInfo}
            />
          </div>
        ))}
      </TableCell>

      <TableCell align="center">
        {[
          {
            label: "Loss Cost",
            name: "loss_cost",
            type: "number",
            selectArray: [],
          },
        ]?.map((order, index) => (
          <div key={index}>
            <CustomAutoComplete
              style={{ minWidth: 110, width: 110 }}
              order={order}
              setFormInfo={setFormInfo}
              formInfo={formInfo}
            />
          </div>
        ))}
      </TableCell>

      <TableCell align="center">{dRow?.shippingCost}</TableCell>

      <TableCell align="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.btnLog}
          onClick={handleGotoLog}
        >
          Log
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.btnSave}
          onClick={handleFormSend}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Items;
