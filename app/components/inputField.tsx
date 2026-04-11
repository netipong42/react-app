import React from "react";

type Option = {
  label: string;
  value: string;
};

type InputFieldProps<T> = {
  name: keyof T;
  type?: "text" | "password" | "email" | "number" | "select";
  value: T[keyof T];
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  options?: Option[];
};

export function InputField<T>({ name, type = "text", value, placeholder, onChange, error, options }: InputFieldProps<T>) {
  {
    if (type === "select") {
      return (
        <div>
          <p>{placeholder}</p>
          <select
            name={name}
            value={value}
            onChange={onChange}
            data-error={!!error}
            className="w-full p-3 text-lg border rounded focus:border-neutral-500 outline-none data-[error=true]:border-red-500"
          >
            <option value="">---select {placeholder}---</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }
  return (
    <div className="mb-3">
      <p>{placeholder}</p>
      <input
        type={type}
        name={name as string}
        value={value as string}
        onChange={onChange}
        data-error={!!error}
        className="w-full p-3 text-lg border rounded focus:border-neutral-500 outline-none data-[error=true]:border-red-500"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
}
