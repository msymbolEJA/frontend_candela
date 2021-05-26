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
// import useFetch from "../../../hooks/useFetch";
import { getData } from "../../../helpers/DataTransitions";

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
}));

// http://104.156.237.87:8080/

const OrderForm = ({ open, detRow }) => {
  const classes = useStyles();
  // const { response, error, loading, setLoading } = useFetch(
  //   `${BASE_URL}ne/ordertrack/4724`,
  //   { results: [] }
  // );
  const [formInfo, setFormInfo] = useState({
    id: 1,
    status: "status test",
    so_user: "t",
    so_info: "e",
    po_vendor: "s",
    po_num: "s",
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
    putData(`${BASE_URL}ne/ordertrack/${detRow.id}`, formInfo);
  };

  const getValues = () => {
    // getData(`http://104.156.237.87:8080/ne/ordertrack/${detRow.id}`).then(
    getData(`http://104.156.237.87:8080/ne/ordertrack/4724`).then((data) => {
      setFormInfo(data.data);
      // console.log(data.data);
    });
  };

  useEffect(() => {
    getValues();
    return;
  }, []);

  return (
    <TableRow className={classes.innerTable}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h4" gutterBottom component="div">
              Order Tracking
            </Typography>
            {OrderFormSelect?.map((order, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <CustomAutoComplete
                  order={order}
                  setFormInfo={setFormInfo}
                  formInfo={formInfo}
                />
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              className={classes.btnSave}
              onClick={handleFormSend}
            >
              Save
            </Button>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default OrderForm;
