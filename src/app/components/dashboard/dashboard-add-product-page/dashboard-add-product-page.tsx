import React from "react";
import DashboardAddProductForm from "./dashboard-add-product-form/dashboard-add-product-form";
import { db } from "@/app/db/db";

type Props = {};

const DashboardAddProductPage = async (props: Props) => {
  const colors = await db.color.findMany({});

  return (
    <section className="bg-white shadow rounded-xl">
      <h1 className="text-dark text-bodyMain p-3">افزودن محصول جدید</h1>
      {/* add product form */}
      <DashboardAddProductForm colors={colors} />
    </section>
  );
};

export default DashboardAddProductPage;
