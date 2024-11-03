import React from "react";
import Pagination from "../../../pagination/pagination";
import ProductTableRow from "./product-table-row/product-table-row";
import { Product } from "../../../../../../next-type-models";
import { PAGE_LIMIT } from "@/app/lib/values";

type Props = {
  totalItems: number;
  products: Product[];
};

const ProductsTable = ({ totalItems, products }: Props) => {
  return (
    <>
      <div className="overflow-x-auto custom-scrollbar mb-20">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-customGray-500 text-right border-b border-t border-customGray-300 table-auto">
              <th className="text-bodySmall p-2 whitespace-nowrap">نام محصول</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">دسته‌بندی</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">قیمت</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">تعداد موجودی</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">تخفیف</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">رنگ‌ها</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">وضعیت موجودی</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">قسمت هیرو</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">قسمت تخفیف</th>
              <th className="text-bodySmall p-2 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product, index: number) => (
              <ProductTableRow
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <Pagination totalItems={totalItems} itemsPerPage={PAGE_LIMIT} />
      </div>
    </>
  );
};

export default ProductsTable;
