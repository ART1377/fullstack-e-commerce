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

interface LowStockProduct {
  id: string;
  title: string;
  stock: { quantity: number }[];
}

interface Data {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  productsInStock: number;
  salesData: SalesData[];
  recentOrders: Order[];
  lowStockProducts: LowStockProduct[];
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

  return (
    <div>
      <h1 className="text-bodyMain mb-4">داشبورد مدیریت</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-3 mb-8 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 blgxl:grid-cols-4">
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
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">روند فروش</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatNumberInPersian} />
            <Tooltip formatter={(value: any) => formatNumberInPersian(value)} />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Low Stock Alerts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">محصولات کم موجودی</h2>
        <ul>
          {data.lowStockProducts.map((product) => (
            <li key={product.id}>
              {product.title} -{" "}
              {formatNumberInPersian(product.stock[0]?.quantity)} باقی مانده
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Orders Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">آخرین سفارشات</h2>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full bg-light">
            <thead>
              <tr>
                <th className="py-2">شناسه سفارش</th>
                <th className="py-2">کاربر</th>
                <th className="py-2">قیمت کل</th>
                <th className="py-2">وضعیت</th>
                <th className="py-2">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td>{order.id}</td>
                  <td>{order.user.email}</td>
                  <td>{formatPrice(order.price)} تومان</td>
                  <td>{order.status}</td>
                  <td>{formatToJalali(order.createdAt)}</td>
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
