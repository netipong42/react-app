"use client";

import { InputField } from "@/app/components/inputField";
import { CustomerService } from "@/services/customer.service";
import { OrderService } from "@/services/order.service";
import { Customer } from "@/types/customer";
import { Field } from "@/types/field";
import { Order } from "@/types/order";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function editOrderPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [saveData, setSaveData] = useState(1);

  const [dataOrder, setDataOrder] = useState<Order>();
  const [errors, setErrors] = useState<Partial<Order>>({});

  const [customerOption, setCustomerOption] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const getData = async (paramsId: string) => {
    try {
      const res = await OrderService.findOrderById(paramsId);
      setDataOrder(res.data.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const getDataCustomer = async () => {
    try {
      const res = await CustomerService.getCustomers(1, 100);
      mapDataCustomerOption(res.data.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const mapDataCustomerOption = (data: Customer[]) => {
    const option = data.map((customer: Customer) => ({
      label: customer.name,
      value: customer.id,
    }));

    setCustomerOption(option);
  };

  useEffect(() => {
    getDataCustomer();
    getData(id);
  }, [id, saveData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDataOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await OrderService.updateOrder(id as string, dataOrder?.status || "pending");
      if (res.status === 200 && res.data.data) {
        alert("Update Data Success");
        setSaveData(saveData + 1);
        router.push(`/order/${res.data.data.id}`);
        setErrors({});
      }
    } catch (error: any) {
      if (error.status === 422) {
        const errors = error.response.data.errors;
        setErrors(errors);
      } else {
        alert(error.response.data.message);
      }
    }
  };

  const fields: Field<Order>[] = [
    { name: "order_no", type: "text", placeholder: "Order No" },
    { name: "customer_id", type: "select", placeholder: "Customer", option: customerOption },
    { name: "product_name", type: "text", placeholder: "Product Name" },
    { name: "quantity", type: "number", placeholder: "Quantity" },
    { name: "price", type: "number", placeholder: "Price" },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      option: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Paid",
          value: "paid",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
      ],
    },
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Order</h1>

      {fields.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          type={field.type}
          value={dataOrder?.[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          error={errors?.[field.name]}
          options={field?.option}
        />
      ))}
      <div className="mt-5">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white text-lg px-6 py-3 tracking-widest hover:cursor-pointer hover:bg-green-700"
        >
          Save
        </button>
        <button
          className="ml-5 bg-gray-600 text-white text-lg px-6 py-3 tracking-widest hover:cursor-pointer hover:bg-gray-700"
          onClick={() => router.push("/order")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
