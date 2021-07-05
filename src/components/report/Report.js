import React, { useState } from "react";
import BestSeller from "./BestSeller";
import Selected from "./Selected";
import CostGetter from "./CostGetter";

const Report = () => {
  const [dates, setDates] = useState({ end_date: "", start_date: "" });

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
        <CostGetter dates={dates} setDates={setDates} />
        <Selected dates={dates} />
        <BestSeller dates={dates} />
      </div>
    </div>
  );
};

export default Report;
