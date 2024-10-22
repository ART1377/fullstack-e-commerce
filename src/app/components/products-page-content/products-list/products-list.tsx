import React from "react";
import ProductsListItems from "./products-list-items/products-list-items";
import ProductListHeader from "./product-list-header/product-list-header";
import Pagination from "../../pagination/pagination";
import { Product } from "../../../../../next-type-models";
import { totalmem } from "os";
import { PAGE_LIMIT } from "@/app/lib/values";

type Props = {
  totalItems: number;
  products: Product[];
};

const ProductsList = ({ products, totalItems }: Props) => {
  return (
    <>
      <div className="w-full sm:w-[calc(100%-292px)]">
        {/* products header */}
        <ProductListHeader totalItems={totalItems} />

        {totalItems! > 0 ? (
          <>
            {/* products list */}
            <ProductsListItems products={products} itemsPerPage={PAGE_LIMIT} />
            {/* products pagination */}
            <div className="mt-10">
              <Pagination
                totalItems={products.length}
                itemsPerPage={PAGE_LIMIT}
              />
            </div>
          </>
        ) : (
          <p className="text-bodyMain text-state-error py-2 px-3 rounded-lg bg-state-error-200 text-center">
            محصولی یافت نشد
          </p>
        )}
      </div>
    </>
  );
};

export default ProductsList;
