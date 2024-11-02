"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import { formatPrice } from "@/app/lib/functions";
import { formatToJalali } from "@/app/lib/date-format";
import Image from "next/image";
import { Product } from "../../../../../../next-type-models";
import ProductTableRow from "../../dashboard-products-page/products-table/product-table-row/product-table-row";
import Link from "next/link";

// Define TypeScript interfaces for each data type in data
interface SalesData {
  date: string;
  sales: number;
}

interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
}

interface Order {
  id: string;
  user: User;
  price: number;
  status: string;
  createdAt: Date;
}

interface Data {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  productsInStock: number;
  salesData: SalesData[];
  recentOrders: Order[];
  lowStockProducts: Product[];
}

type Props = {
  data: Data;
};

// Utility function to format numbers in Persian
const formatNumberInPersian = (number: number) =>
  new Intl.NumberFormat("fa-IR").format(number);

const DashboardPageContent = ({ data }: Props) => {
  // Transform salesData dates to Jalali format
  const formattedSalesData = data.salesData.map((sale) => ({
    ...sale,
    date: formatToJalali(new Date(sale.date)), // Format to Jalali
  }));

  const orderStatusColor = (status: string) => {
    const color =
      status === "جاری"
        ? "warning"
        : status === "تحویل شده"
        ? "success"
        : status === "مرجوع شده"
        ? "error"
        : "";

    return color;
  };

  return (
    <div>
      <h1 className="text-bodyMain mb-4 p-3">داشبورد مدیریت</h1>

      {/* Key Metrics */}
      <div className="p-3 grid grid-cols-1 gap-3 mb-8 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 blgxl:grid-cols-4">
        <div className="px-3 py-16 text-primary-main border border-primary-main rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
          <p className="text-bodyMain">فروش کل</p>
          <small className="text-h6">{data.totalSales} تومان</small>
          <div className="absolute bottom-0 w-full h-4 bg-primary-main"></div>
        </div>

        <div className="px-3 py-16 text-state-success border border-state-success rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
          <p className="text-bodyMain">کل سفارشات</p>
          <small className="text-h6">{data.totalOrders}</small>
          <div className="absolute bottom-0 w-full h-4 bg-state-success"></div>
        </div>

        <div className="px-3 py-16 text-state-warning border border-state-warning rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
          <p className="text-bodyMain">کل کاربران</p>
          <small className="text-h6">{data.totalUsers}</small>
          <div className="absolute bottom-0 w-full h-4 bg-state-warning"></div>
        </div>

        <div className="px-3 py-16 text-state-error border border-state-error rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
          <p className="text-bodyMain">محصولات در انبار</p>
          <small className="text-h6">{data.productsInStock}</small>
          <div className="absolute bottom-0 w-full h-4 bg-state-error"></div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="mb-8 p-3">
        <h2 className="text-bodyMain mb-2">روند فروش</h2>
        <div dir="ltr">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={formattedSalesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Margin to position chart properly
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                width={80} // Increase YAxis width for more space
                tickFormatter={formatNumberInPersian}
              />
              <Tooltip
                formatter={(value: any) => [
                  formatNumberInPersian(value),
                  "فروش",
                ]} // Custom label for tooltip
              />
              <Line type="monotone" dataKey="sales" stroke="#6e24a8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="mb-8 p-3">
        <h2 className="text-bodyMain mb-2">محصولات کم موجودی</h2>
        <div className="flex flex-wrap gap-3">
          {data.lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-light rounded-xl shadow p-3 flex flex-col max-w-48"
            >
              <div className="relative w-full aspect-square rounded-lg">
                <Image
                  src={product?.images?.[0].url!}
                  alt={product.title}
                  fill
                />
              </div>
              <Link
                href={`/products/${product.id}`}
                className="text-bodyMain text-dark line-clamp-1 custom-transition  group-hover:text-primary-main"
              >
                {product.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div>
        <h2 className="text-bodyMain mb-2">آخرین سفارشات</h2>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="text-customGray-500 text-right border-b border-t border-customGray-300">
                {" "}
                <th className="text-bodySmall p-2">شناسه سفارش</th>
                <th className="text-bodySmall p-2">کاربر</th>
                <th className="text-bodySmall p-2">قیمت کل</th>
                <th className="text-bodySmall p-2">تاریخ</th>
                <th className="text-bodySmall p-2">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b border-customGray-300 custom-transition ${
                    index % 2 !== 0
                      ? "bg-customGray-100 hover:bg-customGray-200"
                      : "bg-white hover:bg-customGray-200"
                  }`}
                >
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.user.email}</td>
                  <td className="p-2">{formatPrice(order.price)} تومان</td>
                  <td className="p-2">{formatToJalali(order.createdAt)}</td>
                  <td className="p-2">
                    <div
                      className={`rounded-full px-3 py-0.5 flex-center text-bodySmall w-fit bg-state-${orderStatusColor(
                        order.status
                      )}-200 text-state-${orderStatusColor(order.status)}`}
                    >
                      {order.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="px-3 py-16 text-primary-main bg-light rounded-xl shadow flex-center flex-col gap-3 relative overflow-hidden">
    <p className="text-bodyMain">{label}</p>
    <small className="text-h6">{value}</small>
    <div className="absolute bottom-0 w-full h-4 bg-primary-main"></div>
  </div>
);

export default DashboardPageContent;
