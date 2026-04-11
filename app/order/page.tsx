"use client";
import { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import Link from "next/link";
import { Order } from "@/types/order";
import { OrderService } from "@/services/order.service";

export default function orderPage() {
  const [dataOrder, setDataOrder] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getData = async (pageNumber: number = 1) => {
    try {
      const res = await OrderService.getOrders(pageNumber, 5);
      setDataOrder(res.data.data);
      setTotalPage(res.data?.meta?.total_page || 1);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert(error.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-500",
    paid: "bg-green-500",
    cancelled: "bg-red-500",
  };
  return (
    <>
      <div className="flex justify-between my-3">
        <h1>Order</h1>
        <Link
          href={`/order/create`}
          className="p-1 bg-green-400 hover:bg-green-500 hover:text-white rounded-md cursor-pointer transition-all duration-300"
        >
          เพิ่มข้อมูล
        </Link>
      </div>
      <div>
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">customer_id</th>
              <th className="border px-4 py-2">order_no</th>
              <th className="border px-4 py-2">product_name</th>
              <th className="border px-4 py-2">quantity</th>
              <th className="border px-4 py-2">price</th>
              <th className="border px-4 py-2">total_amount</th>
              <th className="border px-4 py-2">status</th>
              <th className="border px-4 py-2">created_at</th>
              <th className="border px-4 py-2">#</th>
            </tr>
          </thead>
          <tbody>
            {dataOrder.map((data) => (
              <tr key={data.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{data.customer_id}</td>
                <td className="border px-4 py-2">{data.order_no}</td>
                <td className="border px-4 py-2">{data.product_name}</td>
                <td className="border px-4 py-2">{data.quantity}</td>
                <td className="border px-4 py-2">{data.price}</td>
                <td className="border px-4 py-2">{data.total_amount}</td>
                <td className={`border px-4 py-2 ${statusColor[data.status]}`}>{data.status}</td>
                <td className="border px-4 py-2">{data.created_at}</td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    href={`/order/${data.id}`}
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
