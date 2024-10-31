import React from "react";
import Filters from "./filters/filters";
import ProductsList from "./products-list/products-list";
import { SearchQueries } from "../../../../next-type-models";
import * as actions from "@/app/actions/product-actions/product-action";
import { db } from "@/app/db/db";
import { PAGE_LIMIT } from "@/app/lib/values";
import Breadcrumb from "../breadcrumb/breadcrumb";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const ProductsPageContent = async ({ searchParams }: Props) => {
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
    <>
      <Breadcrumb />
      <section className="w-full mt-4 sm:mt-6 flex flex-col sm:flex-row sm:gap-3">
        <Filters filterColors={allColors} />
        {/* products list */}
        <ProductsList totalItems={totalCount!} products={products!} />
      </section>
    </>
  );
};

export default ProductsPageContent;
