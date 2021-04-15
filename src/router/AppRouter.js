import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import BBOrderTable from "../components/ordertable/BestBuy/BBOrderTable";
import NEOrderTable from "../components/ordertable/NewEgg/NEOrdersTable";
import NEBusinessTable from "../components/ordertable/neweggbusiness/NEBOrdersTable";
import WalOrdersTable from "../components/ordertable/wallmart/WalOrdersTable";
import MainLayout from "../components/navbar/MainLayout";
import Login from "../components/login/Login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login/" component={Login} />
        <Route component={DefaultContainer} />
      </Switch>
    </BrowserRouter>
  );
};

const DefaultContainer = () => (
  <div>
    <MainLayout />
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/orders/bb/" component={BBOrderTable} />
      <Route path="/orders/ne/" component={NEOrderTable} />
      <Route path="/orders/neb/" component={NEBusinessTable} />
      <Route path="/orders/wal/" component={WalOrdersTable} />
    </Switch>
  </div>
);

export default AppRouter;
