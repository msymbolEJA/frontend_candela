import React from "react";
import infoSvg from "../assets/info.svg";

export const TableNoOrders = () => {
  return (
    <tr style={{ backgroundColor: "#FFF4E5", color: "#7E413C" }}>
      <td
        colSpan="18"
        style={{
          display: "table-cell",
          height: "5rem",
        }}
      >
        <img src={infoSvg} alt="information" style={{ width: 25 }} />
        <h2>There are no orders.</h2>
      </td>
    </tr>
  );
};
