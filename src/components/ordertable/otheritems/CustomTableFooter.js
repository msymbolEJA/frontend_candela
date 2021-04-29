import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";

const CustomTableFooter = ({
  response,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
}) => {
  return (
    <TableFooter>
      <TableRow>
        <td style={{ textAlign: "right" }}>Total Record :</td>
        <td style={{ textAlign: "left", paddingLeft: 5 }}>
          {response?.count || 0}
        </td>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100, 250, 500, 2500]}
          colSpan={22}
          count={response?.count | 0}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default CustomTableFooter;
