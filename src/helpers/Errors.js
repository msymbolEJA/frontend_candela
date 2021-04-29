import React from "react";
import errorSvg from "../assets/error.svg";

export const TableError = () => {
  return (
    <tr style={{ backgroundColor: "#FDECEA", color: "#7E413C" }}>
      <td
        colSpan="18"
        style={{
          display: "table-cell",
          height: "5rem",
        }}
      >
        <img src={errorSvg} alt="" style={{ width: 25 }} />
        <h2 severity="error">Something went wrong. Try again!</h2>
      </td>
    </tr>
  );
};
