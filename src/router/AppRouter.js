import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import BBOrderTable from "../components/ordertable/BestBuy/BBOrderTable";
import NEOrderTable from "../components/ordertable/NewEgg/NEOrdersTable";
import NEBusinessTable from "../components/ordertable/neweggbusiness/NEBOrdersTable";
import WalOrdersTable2 from "../components/ordertable/walmart2/WalOrdersTable";
import WalOrdersTable3 from "../components/ordertable/walmart3/WalOrdersTable";
import MeteOrdersTable from "../components/ordertable/mete/WalOrdersTable";
import Wal2OrdersTable from "../components/ordertable/new-walmart2/WalOrdersTable";
import WalOrdersTableCa from "../components/ordertable/walmartCa/WalOrdersTable";
import ReturnOrders from "../components/ordertable/returnorders/ReturnOrders";
import MainLayout from "../components/navbar/MainLayout";
import Login from "../components/login/Login";
import PrivateRouter from "./PrivateRouter";
import MicroCenter from "../components/ordertable/micro-center/MicroCenter";
import LogTable from "../components/log-table/LogTable";
import Report from "../components/report/Report";
import Amazon from "../components/ordertable/amazon/Amazon";
import Malabs from "../components/ordertable/malabs/Malabs";
import EbayOrdersTable from "../components/ordertable/ebay/EbayOrdersTable";

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
      {/* <PrivateRouter path="/orders/bb/" component={BBOrderTable} />
      <PrivateRouter path="/orders/ne/" component={NEOrderTable} />
      <PrivateRouter path="/orders/mlab/" component={Malabs} />
      <PrivateRouter path="/orders/neb/" component={NEBusinessTable} /> */}
      <PrivateRouter path="/orders/wal2/" component={Wal2OrdersTable} />
      <PrivateRouter path="/orders/wal3/" component={MeteOrdersTable} />
      <PrivateRouter path="/orders/ebay/" component={EbayOrdersTable} />
      <PrivateRouter path="/orders/cawal/" component={WalOrdersTableCa} />
      <PrivateRouter path="/orders/return-orders/" component={ReturnOrders} />
      {/* <PrivateRouter path="/orders/mt/" component={MeteOrdersTable} />
      <PrivateRouter path="/orders/cawal/" component={WalOrdersTableCa} />
      <PrivateRouter path="/orders/amz/" component={Amazon} />
      <PrivateRouter path="/orders/return-orders/" component={ReturnOrders} />
      <PrivateRouter path="/orders/mc/" component={MicroCenter} /> */}
      <PrivateRouter path="/log-table/:shop/:id" component={LogTable} />
      <PrivateRouter path="/report" component={Report} />
    </Switch>
  </div>
);

export default AppRouter;
