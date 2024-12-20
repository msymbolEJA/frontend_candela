export const NEOrderStatus = [
  { id: "", status: "All" },
  { id: 0, status: "Unshipped" },
  { id: 1, status: "Partially Shipped" },
  { id: 2, status: "Shipped" },
  { id: 3, status: "Invoiced" },
  { id: 4, status: "Voided" },
];

export const WAL_CAOrderStatus = [
  { id: "", status: "All" },
  { id: "Created", status: "Created" },
  { id: "Acknowledged", status: "Acknowledged" },
  { id: "Shipped", status: "Shipped" },
  { id: "Delivered", status: "Delivered" },
  { id: "Cancelled", status: "Cancelled" },
  { id: "Refund", status: "Refund" },
];

export const WAL_OrderStatus = [
  { id: "", status: "All" },
  { id: "Created", status: "Created" },
  { id: "Acknowledged", status: "Acknowledged" },
  { id: "Shipped", status: "Shipped" },
  { id: "Delivered", status: "Delivered" },
  { id: "Cancelled", status: "Cancelled" },
  { id: "REFUND_INITIATED", status: "Refund Initiated" },
  { id: "refund_completed", status: "Refund Completed" },
];

/* 
FULFILLED, IN_PROGRESS, NOT_STARTED, CANCELED, REFUND_COMPLETED, REFUND_INITIATED

*/
export const EBAY_OrderStatus = [
  { id: "", status: "All" },
  { id: "FULFILLED", status: "Fulfilled" },
  { id: "IN_PROGRESS", status: "In Progress" },
  { id: "NOT_STARTED", status: "Not Started" },
  { id: "CANCELED", status: "Cancelled" },
  { id: "REFUND_COMPLETED", status: "Refund Completed" },
  { id: "REFUND_INITIATED", status: "Refund Initiated" },
];

export const AMAZON_OrderStatus = [
  { id: "", status: "All" },
  { id: "AWAITING_FULFILLMENT", status: "Awaiting Fulfillment" },
  { id: "SHIPPED", status: "Shipped" },
  { id: "CANCELLED", status: "Cancelled" },
  { id: "DROPSHIPMENT_REQUESTED", status: "Dropshipment Requested" },
];



export const OrderFormSelect = [
  {
    label: "Status",
    name: "status",
    selectArray: [
      { id: 1, status: "Shipped" },
      { id: 2, status: "ZZZ" },
      { id: 3, status: "Reserved" },
      { id: 4, status: "Stock" },
      { id: 5, status: "Error" },
      { id: 6, status: "Late-Shipment" },
      { id: 7, status: "Cancelled" },
      { id: 8, status: "Returned Supplier" },
      { id: 9, status: "Returned Stocked" },
      { id: 10, status: "Fake Refund" },
      { id: 11, status: "Dispute" },
      { id: 12, status: "Shipsurance" },
      { id: 13, status: "Other" },
    ],
  },
  {
    label: "SO User/Ship Note",
    name: "user_ship_note",
    selectArray: [],
  },
  {
    label: "SO Info",
    name: "so_info",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
  },
  {
    label: "PO Cost",
    name: "po_cost",
    type: "number",
    selectArray: [],
  },
  {
    label: "Ship Cost",
    name: "ship_cost",
    type: "number",
    selectArray: [],
  },
  {
    label: "Refund Cost",
    name: "refund_cost",
    type: "number",
    selectArray: [],
  },
  {
    label: "Return Amount",
    name: "return_amount",
    type: "number",
    selectArray: [],
  },
  {
    label: "Stock Cost",
    name: "stock_cost",
    type: "number",
    selectArray: [],
  },
  {
    label: "Error Reason",
    name: "error_reason",
    selectArray: [
      { id: 1, status: "Price error / Dimension" },
      { id: 2, status: "Out of Stock" },
      { id: 3, status: "Wrong Variant" },
      { id: 4, status: "Wrong Item" },
    ],
  },
  {
    label: "Other",
    name: "other",
    selectArray: [],
  },
];

export const logTableColumns = [
  { id: "id", label: "Id" },
  { id: "order_num", label: "Order Number" },
  { id: "user", label: "User" },
  { id: "field", label: "Field" },
  { id: "updated_data", label: "Updated Data" },
  { id: "change_date", label: "Change Date" },
];

export const bestSellerTableHeaders = [
  {
    id: "SellerPartNumber",
    label: "Seller Part Number",
  },
  {
    id: "Description",
    label: "Description",
  },
  { id: "shop", label: "Shop" },
  { id: "SellerPartNumber", label: "Seller Store" },
  {
    id: "sum_total_price",
    label: "Sum Total Price",
  },
  { id: "sum_item", label: "Sum Item" },
];

export const selectedHeaders = [
  // { id: "cawa", label: "WALMARTCA" },
  { id: "wa2", label: "WALMART2" },
  { id: "wa", label: "WALMART3" },
  { id: "ebay", label: "EBAY" },
  { id: "amazon", label: "AMAZON" },
  // {
  //   id: "ne",
  //   label: "NEWEGG",
  // },
  // {
  //   id: "nb",
  //   label: "NEWEGG BUSINESS",
  // },
  {
    id: "grandTotal",
    label: "GRAND TOTAL",
  },
];

export const customTopStatus = [
  { id: 1, status: "Shipped" },
  { id: 2, status: "ZZZ" },
  { id: 3, status: "Reserved" },
  { id: 4, status: "Stock" },
  { id: 5, status: "Error" },
  { id: 6, status: "Late-Shipment" },
  { id: 7, status: "Cancelled" },
  { id: 8, status: "Returned Supplier" },
  { id: 9, status: "Returned Stocked" },
  { id: 10, status: "Fake Refund" },
  { id: 11, status: "Dispute" },
  { id: 12, status: "Shipsurance" },
  { id: 13, status: "Other" },
];

export const fullfilmentTypes = [
  { id: "all", status: "all" },
  { id: "wf", status: "wf" },
  { id: "sf", status: "sf" },
];

export const ebayFullfilmentTypes = [
  { id: "", status: "all" },
  { id: "sf", status: "sf" },
  { id: "efs", status: "efs" },
];


export const amazonFullfilmentTypes = [
  { id: "", status: "all" },
  { id: "afn", status: "FBA" },
  { id: "mfn", status: "FBM" },
];
