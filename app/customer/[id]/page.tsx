"use client";

import { InputField } from "@/app/components/inputField";
import { CustomerService } from "@/services/customer.service";
import { CustomerCreate } from "@/types/customer";
import { Field } from "@/types/field";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [dataCustomer, setDataCustomer] = useState<CustomerCreate>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerCreate>>({});

  const getData = async (paramsId: string) => {
    try {
      const res = await CustomerService.findCustomerById(paramsId);
      setDataCustomer(res.data.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(dataCustomer);
  };

  const handleSubmit = async () => {
    try {
      const res = await CustomerService.updateCustomer(id as string, dataCustomer);
      if (res.status === 200 && res.data.data) {
        getData(res.data.data.id);
        alert("Update Data Success");
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

  const handleDelete = async () => {
    try {
      const res = await CustomerService.deleteCustomer(id as string);
      if (res.status === 200 && res.data.status === "success") {
        router.push(`/customer`);
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

  const fields: Field<CustomerCreate>[] = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "text", placeholder: "Email" },
    { name: "phone", type: "text", placeholder: "Phone" },
  ];
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>

      {fields.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          type={field.type}
          value={dataCustomer?.[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          error={errors?.[field.name]}
        />
      ))}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-green-600 text-white text-lg px-6 py-3 tracking-widest hover:cursor-pointer hover:bg-green-700"
      >
        Save
      </button>
      <button
        className="ml-5 bg-gray-600 text-white text-lg px-6 py-3 tracking-widest hover:cursor-pointer hover:bg-gray-700"
        onClick={() => router.push("/customer")}
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="ml-5 bg-red-600 text-white text-lg px-6 py-3 tracking-widest hover:cursor-pointer hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
