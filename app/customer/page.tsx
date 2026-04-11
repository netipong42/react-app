"use client";
import { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import Link from "next/link";
import { Customer } from "@/types/customer";
import { CustomerService } from "@/services/customer.service";

export default function customerPage() {
  const [dataCustomer, setDataCustomer] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getData = async (pageNumber = 1) => {
    try {
      const res = await CustomerService.getCustomers(pageNumber, 5);
      setDataCustomer(res.data.data);
      setTotalPage(res.data.meta.total_page);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);
  return (
    <>
      <div className="flex justify-between my-3">
        <h1>Customer</h1>
        <Link
          href={`/customer/create`}
          className="p-1 bg-green-400 hover:bg-green-500 hover:text-white rounded-md cursor-pointer transition-all duration-300"
        >
          เพิ่มข้อมูล
        </Link>
      </div>
      <div>
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">CreatedAt</th>
              <th className="border px-4 py-2">UpdatedAt</th>
              <th className="border px-4 py-2">#</th>
            </tr>
          </thead>
          <tbody>
            {dataCustomer.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.created_at}</td>
                <td className="border px-4 py-2">{user.updated_at}</td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    href={`/customer/${user.id}`}
                    className="p-1 bg-amber-400 hover:bg-amber-500 hover:text-white rounded-md cursor-pointer transition-all duration-300"
                  >
                    แก้ไข
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={page} totalPages={totalPage} onPageChange={setPage} />
      </div>
    </>
  );
}
