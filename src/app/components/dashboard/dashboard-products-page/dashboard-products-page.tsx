import React from "react";
import DashboardProductsPageHeader from "./dashboard-products-page-header/dashboard-products-page-header";
import ProductsTable from "./products-table/products-table";
import * as actions from "@/app/actions/product-actions/product-action";
import { db } from "@/app/db/db";
import { PAGE_LIMIT } from "@/app/lib/values";
import { SearchQueries } from "../../../../../next-type-models";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DashboardProductsPage = async ({ searchParams }: Props) => {
  const {
    selectedCategory,
    colors,
    maxPrice,
    minPrice,
    page,
    searchInput,
    sizes,
    sort,
  } = searchParams as SearchQueries;

  // Fetch products using the updated searchParams
  const { products, totalCount } = await actions.getFilteredProducts({
    limit: PAGE_LIMIT,
    page: page as string,
    category: selectedCategory ? (selectedCategory as string) : undefined,
    sortBy: sort === "ارزان ترین" || "گران ترین" ? "price" : undefined,
    sortOrder:
      sort === "ارزان ترین" ? "asc" : sort === "گران ترین" ? "desc" : undefined,
    colors: colors ? colors?.toString().split(",") : undefined,
    sizes: sizes ? sizes?.toString().split(",") : undefined,
    maxPrice: maxPrice ? (Number(maxPrice) as number) : undefined,
    minPrice: minPrice ? (Number(minPrice) as number) : undefined,
    searchQuery: searchInput ? (searchInput as string) : "",
  });

  const allColors = await db.color.findMany({});

  return (
    <section className="bg-white shadow rounded-xl pb-3">
      {/* header */}
      <DashboardProductsPageHeader
        totalItems={totalCount!}
        filterColors={allColors}
      />
      {/* products table */}
      {totalCount! > 0 ? (
        <ProductsTable totalItems={totalCount!} products={products!} />
      ) : (
        <p className="text-bodyMain text-state-error py-2 px-3 rounded-lg bg-state-error-200 m-4 text-center mb-3">
          محصولی یافت نشد
        </p>
      )}
    </section>
  );
};

export default DashboardProductsPage;
