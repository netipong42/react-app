export type Field<T> = {
  name: keyof T;
  type: "text" | "password" | "email" | "number" | "select";
  placeholder: string;
  option?: {
    label: string;
    value: string;
  }[];
};
