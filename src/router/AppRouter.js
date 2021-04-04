import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import BBOrderTable from "../components/ordertable/BBOrderTable";
import NEOrderTable from "../components/ordertable/NEOrdersTable";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/orders/bb/" component={BBOrderTable} />
        <Route path="/orders/ne/" component={NEOrderTable} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
