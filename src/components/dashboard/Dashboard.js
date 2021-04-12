import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: 10,
    width: 100,
    fontSize: "1rem",
    margin: 10,
    cursor: "pointer",
  },
}));

const Dashboard = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    history.push(event.target.id);
  };
  return (
    <div>
      <h1>DashBoard</h1>
      <button id="orders/bb" onClick={handleClick} className={classes.btn}>
        Best Buy
      </button>
      <button id="orders/ne" onClick={handleClick} className={classes.btn}>
        New Egg
      </button>
      <button id="orders/wal" onClick={handleClick} className={classes.btn}>
        Wallmart
      </button>
    </div>
  );
};

export default Dashboard;
