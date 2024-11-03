import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { orderStatusColor } from "../dashboard-page-content";
import { StatusPercentage } from "../../../../../../../next-type-models";

type Props = {
  data: StatusPercentage[];
};

const OrdersStatusPieChart = ({ data }: Props) => (
  <div className="p-3 mb-8">
    <h3 className="text-bodyMain mb-2">وضعیت سفارش‌ها</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="percentage"
          nameKey="status"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
        >
          {data.map((entry, index) => {
            // Tailwind classes based on status
            const fillColorClass = (() => {
              switch (entry.status) {
                case "جاری":
                  return "state-warning"; // Tailwind yellow color for "جاری"
                case "تحویل شده":
                  return "state-success"; // Tailwind green color for "تحویل شده"
                case "مرجوع شده":
                  return "state-error"; // Tailwind red color for "مرجوع شده"
                default:
                  return "primary-main"; // Default Tailwind color
              }
            })();

            return (
              <Cell key={`cell-${index}`} fill={`var(--${fillColorClass})`} />
            );
          })}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [
            `${value}%`,
            `${props.payload.status}: ${props.payload.count} سفارش`,
          ]}
          wrapperStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            padding: "5px",
            borderRadius: "4px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-between text-sm text-customGray-500">
      {data.map((status) => (
        <div key={status.status} className="flex items-center gap-1">
          <span
            className={`w-3 h-3 inline-block rounded-full bg-state-${orderStatusColor(
              status.status
            )}`}
          />
          <span className="text-customGray-500 text-bodySmall">
            {status.status}
          </span>
        </div>
      ))}
    </div>
    {/* <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden flex">
      {data.map((status) => (
        <div
          key={status.status}
          className={`h-full bg-state-${orderStatusColor(status.status)}`}
          style={{ width: `${status.percentage}%` }}
          title={`${status.status}: ${status.percentage}% (${status.count} سفارش)`}
        />
      ))}
    </div>
    <div className="flex justify-between mt-2 text-sm text-customGray-500">
      {data.map((status) => (
        <div key={status.status} className="flex items-center gap-2">
          <span
            className={`w-3 h-3 inline-block bg-state-${orderStatusColor(
              status.status
            )}-200 rounded-full`}
          />
          <span className="text-customGray-500 text-bodySmall">
            {status.percentage}%
          </span>
        </div>
      ))}
    </div> */}
  </div>
);

export default OrdersStatusPieChart;
