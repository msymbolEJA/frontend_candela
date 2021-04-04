import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import OrderTable from "../components/ordertable/OrderTable";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/orders/:id" component={OrderTable} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
