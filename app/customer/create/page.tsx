"use client";

import { InputField } from "@/app/components/inputField";
import { CustomerService } from "@/services/customer.service";
import { CustomerCreate } from "@/types/customer";
import { Field } from "@/types/field";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditCustomerPage() {
  const router = useRouter();

  const [dataCustomer, setDataCustomer] = useState<CustomerCreate>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerCreate>>({});

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
      const res = await CustomerService.createCustomer(dataCustomer);
      if (res.status === 201 && res.data.data) {
        alert("Update Data Success");
        router.push(`/customer/${res.data.data.id}`);
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

  const fields: Field<CustomerCreate>[] = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "text", placeholder: "Email" },
    { name: "phone", type: "text", placeholder: "Phone" },
  ];
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Create Customer</h1>

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
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
}
