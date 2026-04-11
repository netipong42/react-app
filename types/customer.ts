export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

export type CustomerCreate = {
  name: string;
  email: string;
  phone: string;
};
