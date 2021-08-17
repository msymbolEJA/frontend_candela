import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import BBOrderTable from "../components/ordertable/BestBuy/BBOrderTable";
import NEOrderTable from "../components/ordertable/NewEgg/NEOrdersTable";
import NEBusinessTable from "../components/ordertable/neweggbusiness/NEBOrdersTable";
import WalOrdersTable from "../components/ordertable/walmart/WalOrdersTable";
import ReturnOrders from "../components/ordertable/returnorders/ReturnOrders";
import MainLayout from "../components/navbar/MainLayout";
import Login from "../components/login/Login";
import PrivateRouter from "./PrivateRouter";
import MicroCenter from "../components/ordertable/micro-center/MicroCenter";
import LogTable from "../components/log-table/LogTable";
import Report from "../components/report/Report";

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
      <PrivateRouter exact path="/" component={Dashboard} />
      <PrivateRouter path="/orders/bb/" component={BBOrderTable} />
      <PrivateRouter path="/orders/ne/" component={NEOrderTable} />
      <PrivateRouter path="/orders/neb/" component={NEBusinessTable} />
      <PrivateRouter path="/orders/wal/" component={WalOrdersTable} />
      <PrivateRouter path="/orders/return-orders/" component={ReturnOrders} />
      <PrivateRouter path="/orders/mc/" component={MicroCenter} />
      <PrivateRouter path="/log-table/:id" component={LogTable} />
      <PrivateRouter path="/report" component={Report} />
    </Switch>
  </div>
);

export default AppRouter;
