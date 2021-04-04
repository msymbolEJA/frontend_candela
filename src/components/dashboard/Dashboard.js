import React from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  const handleClick = (event) => {
    history.push(event.target.id);
  };
  return (
    <div>
      <h1>DashBoard</h1>
      <button id="orders/bb" onClick={handleClick}>
        BB Orders
      </button>
      <button id="orders/ne" onClick={handleClick}>
        NE Orders
      </button>
    </div>
  );
};

export default Dashboard;
