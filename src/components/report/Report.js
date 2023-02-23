import React, { useState } from "react";
import BestSeller from "./BestSeller";
import Selected from "./Selected";
import DateFilter from "../../helpers/DateFilter";
import { ConstantCost } from "./ConstantCost";
import moment from "moment";
import DailyChart from "./DailyChart";

const Report = () => {
  const [dates, setDates] = useState({
    end_date: moment().format("YYYY-MM-DD"),
    start_date: moment().subtract(1, "months").format("YYYY-MM-DD"),
  });

  const username = JSON.parse(localStorage.getItem("user"))?.username;

  return (
    <div>
      <h2>Report</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {username === "Admin50" && <ConstantCost />}
        <DateFilter dates={dates} setDates={setDates} />
        <Selected dates={dates} />
        {/* <DailyChart dates={dates} /> */}
        <BestSeller dates={dates} />
      </div>
    </div>
  );
};

export default Report;
