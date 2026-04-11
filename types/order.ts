export type Order = {
  id: string;
  customer_id: string;
  order_no: string;
  product_name: string;
  quantity: number;
  price: number;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
};

export type OrderCreate = {
  customer_id: string;
  order_no: string;
  product_name: string;
  quantity: number;
  price: number;
  status: OrderStatus;
};

export type OrderStatus = "pending" | "completed" | "cancelled";
