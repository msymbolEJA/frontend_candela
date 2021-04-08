import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import BBOrderTable from "../components/ordertable/BestBuy/BBOrderTable";
import NEOrderTable from "../components/ordertable/NewEgg/NEOrdersTable";
import MainLayout from "../components/navbar/MainLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/orders/bb/" component={BBOrderTable} />
        <Route path="/orders/ne/" component={NEOrderTable} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
