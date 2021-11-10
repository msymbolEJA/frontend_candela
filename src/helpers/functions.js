export const upcEditFunc = (singleUpc, classes) => {
  return Array.isArray(singleUpc)
    ? singleUpc?.map((item, index) => (
        <p key={index} className={classes.upcStyle}>
          {item
            ?.replace("MC_UPC_", "MC - ")
            ?.replace("NC_UPC_", "BB - ")
            ?.replace("AC_UPC_", "AZ - ")
            ?.replace("EC_UPC_", "ET - ")}
        </p>
      ))
    : singleUpc
        ?.replace("MC_UPC_", "MC - ")
        ?.replace("NC_UPC_", "BB - ")
        ?.replace("AC_UPC_", "AZ - ")
        ?.replace("EC_UPC_", "ET - ");
};

export const bgColorSetter = (item) => {
  return item?.includes("Awaiting-fulfillment")
    ? "#FFF5DA"
    : item?.includes("Cancelled")
    ? "#FF7171"
    : item?.includes("Error")
    ? "#8F4068"
    : item?.includes("Late-shipment")
    ? "#B590CA"
    : item?.includes("Ordered")
    ? "#F3D1F4"
    : item?.includes("Refund/return")
    ? "#C06C84"
    : item?.includes("Shipped")
    ? "#C68B59"
    : item?.includes("Stock")
    ? "#BE8ABF"
    : item?.includes("ZZZ")
    ? "#8AC6D1"
    : item?.includes("Ready")
    ? "#32AFA9"
    : item?.includes("Partial-refund")
    ? "#445C3C"
    : item?.includes("Reserved")
    ? "#F7DAD9"
    : item?.includes("Label Purchased")
    ? "#FFC947"
    : item?.includes("Other")
    ? "#DBE9B7"
    : "bdd2b6";
};
