import spinner from "../assets/spinner.gif";

export const TableLoadingSpinner = () => {
  return (
    <tr>
      <td
        colSpan="18"
        style={{
          display: "table-cell",
          height: "5rem",
        }}
      >
        <img
          src={spinner}
          style={{
            width: 50,
          }}
          alt="spinner"
        />
      </td>
    </tr>
  );
};
