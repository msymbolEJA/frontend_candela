import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import bestbuy from "../../assets/bestbuy.png";
import walmart from "../../assets/walmart.png";
import newegg from "../../assets/newegg.png";
import neweggBusiness from "../../assets/nebusiness.png";
import microCenter from "../../assets/micro-center.png";

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: 10,
    width: 300,
    fontSize: "1rem",
    margin: 10,
    cursor: "pointer",
    borderBottom: "3px solid green",
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

      <img
        id="orders/bb"
        onClick={handleClick}
        className={classes.btn}
        src={bestbuy}
        alt="besybuy"
      />
      <img
        id="orders/ne"
        onClick={handleClick}
        className={classes.btn}
        src={newegg}
        alt="newegg"
      />
      <img
        id="orders/wal"
        onClick={handleClick}
        className={classes.btn}
        src={walmart}
        alt="walmart"
      />
      <img
        id="orders/neb"
        onClick={handleClick}
        className={classes.btn}
        src={neweggBusiness}
        alt="neweggbusiness"
      />
      <img
        id="orders/mc"
        onClick={handleClick}
        className={classes.btn}
        src={microCenter}
        alt="micro-center"
      />
    </div>
  );
};

export default Dashboard;
