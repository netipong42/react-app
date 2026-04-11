"use client";

import Link from "next/link";
import { useState } from "react";
import { InputField } from "../components/inputField";
import { Login } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import { Field } from "@/types/field";

export default function LoginPage() {
  const [formLogin, setFormLogin] = useState<Login>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Login>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await AuthService.login(formLogin);
    } catch (error: any) {
      if (error.status === 422) {
        setErrors(error.data.errors);
      } else {
        alert(error.data.message);
      }
    }
  };

  const fields: Field<Login>[] = [
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto p-37.5">
        <div className="w-full md:w-120 lg:w-200 mx-auto bg-white p-10 rounded shadow">
          <h2 className="text-4xl font-semibold mb-4">Login</h2>
          <h3>
            Don't have an account?
            <Link href="/register" className="text-blue-500 hover:text-blue-700 ml-3">
              Sign In
            </Link>
          </h3>
          <div className="p-5">
            {fields.map((field) => (
              <InputField
                key={field.name}
                name={field.name}
                type={field.type}
                value={formLogin[field.name]}
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
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
