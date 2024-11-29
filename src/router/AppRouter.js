import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import LogTable from "../components/log-table/LogTable";
import Login from "../components/login/Login";
import MainLayout from "../components/navbar/MainLayout";
import EbayOrdersTable from "../components/ordertable/ebay/EbayOrdersTable";
import AmazonOrdersTable from "../components/ordertable/amazon/AmazonOrdersTable";
import MeteOrdersTable from "../components/ordertable/wal3/WalOrdersTable";
import Wal2OrdersTable from "../components/ordertable/wal2/WalOrdersTable";
import Report from "../components/report/Report";
import PrivateRouter from "./PrivateRouter";

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
      <PrivateRouter path="/orders/wal2/" component={Wal2OrdersTable} />
      <PrivateRouter path="/orders/wal3/" component={MeteOrdersTable} />
      <PrivateRouter path="/orders/ebay/" component={EbayOrdersTable} />
      <PrivateRouter path="/orders/amazon/" component={AmazonOrdersTable} />
      <PrivateRouter path="/log-table/:shop/:id" component={LogTable} />
      <PrivateRouter path="/report" component={Report} />
    </Switch>
  </div>
);

export default AppRouter;
