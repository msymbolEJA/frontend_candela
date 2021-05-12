export const NEOrderStatus = [
  { id: "", status: "All" },
  { id: 0, status: "Unshipped" },
  { id: 1, status: "Partially Shipped" },
  { id: 2, status: "Shipped" },
  { id: 3, status: "Invoiced" },
  { id: 4, status: "Voided" },
];

export const WALOrderStatus = [
  { id: "", status: "All" },
  { id: "Created", status: "Created" },
  { id: "Acknowledged", status: "Acknowledged" },
  { id: "Shipped", status: "Shipped" },
  { id: "Delivered", status: "Delivered" },
  { id: "Cancelled", status: "Cancelled" },
  { id: "Refund", status: "Refund" },
];

export const OrderFormSelect = [
  {
    label: "Status",
    name: "status",
    selectArray: [
      { id: 1, status: "Awaiting-fulfillment" },
      { id: 2, status: "Cancelled" },
      { id: 3, status: "Error" },
      { id: 4, status: "Late-shipment" },
      { id: 5, status: "Ordered" },
      { id: 6, status: "Refund/return" },
      { id: 7, status: "Shipped" },
      { id: 8, status: "Stock" },
      { id: 9, status: "ZZZ" },
      { id: 10, status: "Ready" },
      { id: 11, status: "Partial-refund" },
      { id: 12, status: "Reserved" },
      { id: 13, status: "Other" },
    ],
  },
  {
    label: "Return Status",
    name: "returnStatus",
    selectArray: [
      { id: 1, status: "Rejected" },
      { id: 2, status: "Return" },
      { id: 3, status: "Exhange" },
      { id: 4, status: "Resolved" },
      { id: 5, status: "Waiting-Label" },
      { id: 6, status: "Label-Ready" },
      { id: 7, status: "Other" },
    ],
  },
  {
    label: "Assignee",
    name: "assignee",
    selectArray: [
      { id: 1, status: "Umut" },
      { id: 2, status: "Mert" },
      { id: 3, status: "Emre" },
      { id: 4, status: "Senih" },
      { id: 5, status: "Other" },
    ],
  },
  {
    label: "Payment",
    name: "payment",
    selectArray: [
      { id: 1, status: "PayPal" },
      { id: 2, status: "MC-1000" },
      { id: 3, status: "CC-5574" },
      { id: 4, status: "Other" },
    ],
  },
  {
    label: "Vendor",
    name: "vendor",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
  },
  {
    label: "Channel",
    name: "channel",
    selectArray: [
      { id: 1, status: "Manuel" },
      { id: 2, status: "E_NHS" },
      { id: 3, status: "E_Candela" },
      { id: 4, status: "E_X1hardware" },
      { id: 5, status: "E_UTN" },
      { id: 6, status: "Naturawell" },
      { id: 7, status: "E_OScope" },
      { id: 8, status: "NetworkPrime" },
      { id: 9, status: "Centernex" },
      { id: 10, status: "Polebright" },
      { id: 11, status: "E_ButNetwork" },
      { id: 12, status: "Walmart" },
      { id: 13, status: "NewEgg" },
      { id: 14, status: "NewEgg CNTRX" },
      { id: 15, status: "Other" },
    ],
  },
];
