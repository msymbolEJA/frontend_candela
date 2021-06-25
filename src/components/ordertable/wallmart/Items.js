import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import checkSvg from "../../../assets/check.svg";
import warnSvg from "../../../assets/warn.svg";
import useFetch from "../../../hooks/useFetch";
import moment from "moment";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  priceStyle: {
    fontSize: "1.25rem",
  },
  oldPrice: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
});

const Items = ({ dRow }) => {
  const classes = useStyles();
  const { response } = useFetch(
    `${BASE_URL}${dRow?.sku.includes("MC") ? "mc" : "bb"}/${dRow.sku
      .replace("NC_UPC_", "")
      .replace("MC_UPC_", "")}`
  );

  const getUpc = () => {
    if (dRow?.sku.includes("NC_UPC_")) {
      return dRow.sku.replace("NC_UPC_", "");
    } else if (dRow?.sku.includes("MC_UPC_")) {
      return dRow.sku.replace("MC_UPC_", "");
    }
  };

  let isBuyable =
    Number(dRow?.itemPrice) / 1.3 >
      Number(response?.salePrice) + Number(response?.shippingCost) &&
    response?.onlineAvailability;
  // console.log({ isBuyable });

  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        {dRow.productName}
      </TableCell>
      <TableCell align="center">{getUpc()}</TableCell>
      <TableCell align="center">
        <>
          <p className={classes.priceStyle}>{dRow.itemPrice}</p>
        </>
      </TableCell>
      <TableCell align="center">
        <>
          <p className={classes.oldPrice}>
            {response?.pre_salePrice ? response?.pre_salePrice : null}
          </p>
          <p className={classes.priceStyle}>
            {response?.salePrice ? response?.salePrice : "-"}
          </p>
          {response?.url ? (
            <a href={response?.url} target="_blank" rel="noreferrer">
              Visit
            </a>
          ) : null}
        </>
      </TableCell>
      <TableCell align="center">
        {moment.utc(response?.priceUpdateDate).local().format("MM-DD-YY HH:mm")}
      </TableCell>
      <TableCell align="center">{response?.shippingCost}</TableCell>
      <TableCell align="center">{dRow.orderStatus}</TableCell>
      <TableCell align="center">{dRow?.taxAmount}</TableCell>
      <TableCell align="center" style={{ maxWidth: 500 }}>
        {dRow.taxName}
      </TableCell>
      <TableCell align="center">
        {response?.onlineAvailability ? "Yes" : "No"}
      </TableCell>
      <TableCell align="center">
        {moment
          .utc(response?.onlineAvailabilityUpdateDate)
          .local()
          .format("MM-DD-YY HH:mm")}
      </TableCell>
      <TableCell align="center">{dRow?.ShippingAmount}</TableCell>
      <TableCell align="center">
        <img
          src={isBuyable ? checkSvg : warnSvg}
          style={{ width: 25 }}
          alt=""
        />
      </TableCell>
    </TableRow>
  );
};

export default Items;
