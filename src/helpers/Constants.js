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
      { id: 13, status: "Label Purchased" },
      { id: 14, status: "Other" },
    ],
  },
  {
    label: "SO User",
    name: "so_user",
    selectArray: [
      { id: 1, status: "Umut" },
      { id: 2, status: "Mert" },
      { id: 3, status: "Emre" },
      { id: 4, status: "Senih" },
      { id: 5, status: "Other" },
    ],
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
    label: "PO Vendor",
    name: "po_vendor",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
  },
  {
    label: "PO Num",
    name: "po_num",
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
    label: "Payment Method",
    name: "pay_method",
    selectArray: [
      { id: 1, status: "PayPal" },
      { id: 2, status: "MC-1000" },
      { id: 3, status: "CC-5574" },
      { id: 4, status: "Other" },
    ],
  },
  {
    label: "Quantity",
    name: "qty",
    type: "number",
    selectArray: [],
  },
  {
    label: "Condition",
    name: "condition",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
  },
  {
    label: "Tracking",
    name: "tracking",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
  },
  {
    label: "Serial",
    name: "serial",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
  },
  {
    label: "PO Info",
    name: "po_info",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
  },
  {
    label: "Account Owner",
    name: "account_owner",
    selectArray: [
      { id: 1, status: "MemoryAmerica" },
      { id: 2, status: "Gigatech Products. Inc." },
      { id: 3, status: "Other" },
    ],
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
  {
    id: "sum_total_price",
    label: "Sum Total Price",
  },
  { id: "sum_item", label: "Sum Item" },
];

export const selectedHeaders = [
  {
    id: "ne",
    label: "NEWEGG",
  },
  {
    id: "nb",
    label: "NEWEGG BUSINESS",
  },
  { id: "wa", label: "WALMART" },
  {
    id: "grandTotal",
    label: "Grand Total",
  },
];
