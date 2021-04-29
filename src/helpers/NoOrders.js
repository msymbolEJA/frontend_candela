import React from "react";
import emptyCartSvg from "../assets/emptycart.svg";

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
        <img src={emptyCartSvg} alt="empty-cart" style={{ width: 35 }} />
        <h2>There are no orders.</h2>
      </td>
    </tr>
  );
};
