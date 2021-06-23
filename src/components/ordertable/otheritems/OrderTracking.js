import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CustomAutoComplete from "../otheritems/CustomAutoComplete";
import { OrderFormSelect } from "../../../helpers/Constants";
import { putData } from "../../../helpers/DataTransitions";
import useFetch from "../../../hooks/useFetch";
import { useHistory } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  innerTable: {
    backgroundColor: "#bdd2b6",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btnSave: {
    margin: theme.spacing(1.3),
    color: "#52734d",
    borderColor: "#52734d",
    minWidth: 160,
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
    minWidth: 160,
    backgroundColor: "#52734d",
    "&:hover": {
      color: "#52734d",
      backgroundColor: "#fad586",
    },
  },
  orderHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

const OrderTracking = ({ open, detRow, store }) => {
  const classes = useStyles();
  let history = useHistory();
  const { response, error, loading } = useFetch(
    `${BASE_URL}${store}/ordertrack/${detRow.id}`,
    {}
  );
  const [formInfo, setFormInfo] = useState({
    id: 1,
    status: "",
    so_user: "",
    so_info: "",
    po_vendor: "",
    po_num: "",
    po_cost: 0,
    pay_method: "",
    qty: 1,
    condition: "",
    tracking: "",
    serial: "",
    po_info: "",
    account_owner: "",
    // item: "",
  });

  const handleFormSend = () => {
    console.log({ formInfo });
    putData(`${BASE_URL}${store}/ordertrack/${detRow.id}`, formInfo);
  };

  useEffect(() => {
    setFormInfo(response);
    return;
  }, [response]);

  const handleGotoLog = () => {
    history.push(`/log-table/${detRow.OrderNumber}`);
  };

  return (
    <TableRow className={classes.innerTable}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <div className={classes.orderHeader}>
              <Typography variant="h4" gutterBottom component="div">
                Order Tracking
              </Typography>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnLog}
                  onClick={handleGotoLog}
                >
                  Go to Log
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnSave}
                  onClick={handleFormSend}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className={classes.inputGroup} style={{}}>
              {loading ? (
                <p>Loading</p>
              ) : error ? (
                <p>Something went wrong</p>
              ) : (
                OrderFormSelect?.map((order, index) => (
                  <div key={index}>
                    <CustomAutoComplete
                      order={order}
                      setFormInfo={setFormInfo}
                      formInfo={formInfo}
                    />
                  </div>
                ))
              )}
            </div>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default OrderTracking;
