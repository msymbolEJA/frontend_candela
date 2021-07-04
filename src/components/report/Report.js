import React from "react";
import BestSeller from "./BestSeller";
import Selected from "./Selected";
import CostGetter from "./CostGetter";

const Report = () => {
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
        <CostGetter />
        <Selected />
        <BestSeller />
      </div>
    </div>
  );
};

export default Report;
