import { useState } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { OrderFormSelect } from "../../../helpers/Constants";
import CustomAutoComplete from "../otheritems/CustomAutoComplete";

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

const OrderForm = ({ open }) => {
  const classes = useStyles();
  const [formInfo, setFormInfo] = useState({
    assignee: "",
    channel: "",
    payment: "",
    returnStatus: "",
    status: "",
    vendor: "",
  });

  const handleFormSend = () => {
    console.log({ formInfo });
  };

  return (
    <TableRow className={classes.innerTable}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h4" gutterBottom component="div">
              Order Tracking
            </Typography>
            {/* {OrderFormSelect?.map((item, index) => (
              <FormControl
                variant="outlined"
                key={index}
                className={classes.formControl}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  {item.label}
                </InputLabel>
                <Select
                  native
                  value={formInfo[item.name]}
                  // defaultValue="await"
                  onChange={handleChange}
                  label={item.label}
                  margin="dense"
                  inputProps={{
                    name: item.name,
                    id: "outlined-age-native-simple",
                  }}
                >
                  {item?.selectArray?.map((item, index) => (
                    <option value={item.status} key={index}>
                      {item.status}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ))} */}
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
