import React from "react";
import { motion } from 'framer-motion';
type Props = {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  productsInStock: number;
};

const DashboardMetricCards = ({
  productsInStock,
  totalOrders,
  totalSales,
  totalUsers,
}: Props) => {
  

  const stats = [
    { title: "فروش کل", value: totalSales, colorClass: "text-primary-main", bgClass: "bg-primary-main" },
    { title: "کل سفارشات", value: totalOrders, colorClass: "text-state-success", bgClass: "bg-state-success" },
    { title: "کل کاربران", value: totalUsers, colorClass: "text-state-warning", bgClass: "bg-state-warning" },
    { title: "محصولات در انبار", value: productsInStock, colorClass: "text-state-error", bgClass: "bg-state-error" }
  ];

  return (
    <motion.div
      className="p-3 grid grid-cols-1 gap-3 mb-8 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 blgxl:grid-cols-4"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.2 }, // Delay between children
        },
      }}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`px-3 py-16 ${stat.colorClass} border ${stat.colorClass} rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden`}
          variants={{
            hidden: {
              opacity: 0,
              y: -40, // Start from bottom
            },
            show: {
              opacity: 1,
              y: 0, // End at normal position
              transition: { duration: 0.5 }, // Animation duration
            },
          }}
        >
          <p className="text-bodyMain">{stat.title}</p>
          <small className="text-h6">{stat.value}</small>
          <div className={`absolute bottom-0 w-full h-4 ${stat.bgClass}`}></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardMetricCards;
