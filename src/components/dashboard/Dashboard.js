import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import walmart from "../../assets/walmart.png";

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: 10,
    width: 300,
    fontSize: "1rem",
    margin: 10,
    cursor: "pointer",
    borderBottom: "3px solid green",
  },
  storeLine:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
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
      <div className={classes.storeLine}>
       
      </div>
      <hr />
      
      <img
        id="orders/wal"
        onClick={handleClick}
        className={classes.btn}
        src={walmart}
        alt="walmart"
      />
     
    </div>
  );
};

export default Dashboard;
