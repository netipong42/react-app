"use client";

import { useState } from "react";
import { InputField } from "../components/inputField";
import { Register } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import { Field } from "@/types/field";

export default function RegisterPage() {
  const [formRegister, setFormRegister] = useState<Register>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<Partial<Register>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await AuthService.register(formRegister);
    } catch (error: any) {
      if (error.status === 422) {
        setErrors(error.data.errors);
      } else {
        alert(error.data.message);
      }
    }
  };

  const fields: Field<Register>[] = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "password_confirmation", type: "password", placeholder: "Confirm Password" },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto p-37.5">
        <div className="w-full md:w-120 lg:w-200 mx-auto bg-white p-10 rounded shadow">
          <h2 className="text-4xl font-semibold mb-4">Register</h2>

          <div className="p-5">
            {fields.map((field) => (
              <InputField
                key={field.name}
                name={field.name}
                type={field.type}
                value={formRegister[field.name]}
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
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
