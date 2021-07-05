import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import { getData } from "../../helper/PostData";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
import Button from "@material-ui/core/Button";
import moment from "moment";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    margin: 20,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  date: {
    margin: 5,
  },
  btnDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  btn: {
    margin: 5,
  },
}));

const CostGetter = ({ dates, setDates }) => {
  const classes = useStyles();
  const beginnerDateRef = useRef(null);
  const endDateRef = useRef(null);

  const getDate = () => {
    // console.log("B", beginnerDateRef.current.value);
    // console.log("E", endDateRef.current.value);
    setDates({
      ...dates,
      end_date: endDateRef.current.value,
      start_date: beginnerDateRef.current.value,
    });
  };

  const resetDate = () => {
    setDates({
      ...dates,
      end_date: "",
      start_date: "",
    });
  };

  useEffect(() => {
    endDateRef.current.value = moment().format("YYYY-MM-DD");
    beginnerDateRef.current.value = moment()
      .subtract(1, "months")
      .format("YYYY-MM-DD");
  }, []);

  return (
    <Paper className={classes.paper} style={{}}>
      <div className={classes.column}>
        <label htmlFor="beginnerDate" className={classes.date}>
          Beginner Date:
        </label>
        <input ref={beginnerDateRef} type="date" className={classes.date} />
      </div>
      <div className={classes.column}>
        <label htmlFor="endDate" className={classes.date}>
          End Date:
        </label>
        <input ref={endDateRef} type="date" className={classes.date} />
      </div>
      <div className={classes.btnDiv}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={getDate}
          className={classes.btn}
        >
          Calculate
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={resetDate}
          className={classes.btn}
        >
          Reset
        </Button>
      </div>
    </Paper>
  );
};

export default CostGetter;
