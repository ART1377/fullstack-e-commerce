import { formatPrice } from "@/app/lib/format-price";
import React from "react";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import { SalesData } from "../../../../../../../next-type-models";
import { formatToJalali } from "@/app/lib/date-format";

type Props = {
  data: SalesData[];
};

const SellChart = ({ data }: Props) => {
  // Transform salesData dates to Jalali format
  const formattedSalesData = data.map((sale) => ({
    ...sale,
    date: formatToJalali(new Date(sale.date)), // Format to Jalali
  }));

  return (
    <div className="mb-8 p-3">
      <h2 className="text-bodyMain mb-2">روند فروش</h2>
      {data.length > 0 ? (
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
              />
              <Tooltip
                formatter={(value: any) => [formatPrice(value), "فروش"]} // Custom label for tooltip
              />
              <Line type="monotone" dataKey="sales" stroke="#6e24a8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-center bg-state-error-200 rounded-xl text-center text-bodySmall text-state-error py-5 px-3">
          سفارشی موجود نیست.
        </div>
      )}
    </div>
  );
};

export default SellChart;
