import React, { Suspense } from "react";
import DashboardEditProductForm from "./dashboard-edit-product-form/dashboard-edit-product-form";
import { Product } from "../../../../../next-type-models";
import { db } from "@/app/db/db";
import Spinner from "../../spinner/spinner";

type Props = {
  product: Product; //need change
};

const DashboardEditProductPage = async ({ product }: Props) => {
  const colors = await db.color.findMany({});

  return (
    <section className="bg-white shadow rounded-xl">
      <h1 className="text-dark text-bodyMain p-3">ویرایش محصول</h1>
      
      {/* add product form */}
      <Suspense fallback={<Spinner fullPage />}>
        <DashboardEditProductForm product={product} colors={colors} />
      </Suspense>
    </section>
  );
};

export default DashboardEditProductPage;
