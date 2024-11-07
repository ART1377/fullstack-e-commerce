import React from "react";
import { Product } from "../../../../../../../next-type-models";
import Image from "next/image";
import { formatPrice } from "@/app/lib/format-price";
import Tooltip from "@/app/components/tooltip/tooltip";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import EditIcon from "@/app/icons/edit-icon";
import Stock from "@/app/components/stock/stock";
import Link from "next/link";

type Props = {
  data: Product[];
};

const LowStockAlert = ({ data }: Props) => {
  return (
    <div className="mb-8">
      <h4 className="text-bodyMain mb-2 p-3">محصولات کم موجودی</h4>
      {data.length > 0 ? (
        <div className="overflow-x-auto custom-scrollbar mb-20">
          <table className="min-w-full bg-white border-collapse table-auto">
            <thead>
              <tr className="text-customGray-500 text-right border-b border-t border-customGray-300">
                <th className="text-bodySmall p-2 whitespace-nowrap">
                  نام محصول
                </th>
                <th className="text-bodySmall p-2 whitespace-nowrap">
                  دسته‌بندی
                </th>
                <th className="text-bodySmall p-2 whitespace-nowrap">قیمت</th>
                <th className="text-bodySmall p-2 whitespace-nowrap">
                  تعداد موجودی
                </th>
                <th className="text-bodySmall p-2 whitespace-nowrap">تخفیف</th>
                <th className="text-bodySmall p-2 whitespace-nowrap">
                  وضعیت موجودی
                </th>
                <th className="text-bodySmall p-2 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((product: Product, index: number) => {
                const totalQuantity = product.stock?.reduce(
                  (acc, stockItem) => acc + stockItem.quantity,
                  0
                );
                return (
                  <tr
                    key={product.id}
                    className={`border-b border-customGray-300 custom-transition ${
                      index % 2 !== 0
                        ? "bg-customGray-100 hover:bg-customGray-200"
                        : "bg-white hover:bg-customGray-200"
                    }`}
                  >
                    <td className="p-2 flex items-center gap-2">
                      <div className="size-12 rounded-xl shadow relative overflow-hidden">
                        <Image
                          alt={product.title}
                          src={product.images?.[0].url!}
                          fill
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      {product.title}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {formatPrice(product.price)}
                    </td>
                    <td className="p-2 whitespace-nowrap">{totalQuantity}</td>
                    <td className="p-2 whitespace-nowrap">{`${
                      product.discount ? `${product.discount}%` : ""
                    }`}</td>
                    <td className="p-2 whitespace-nowrap">
                      <Stock quantity={totalQuantity!} />
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <Tooltip
                        content="ویرایش محصول"
                        position="right"
                        color="primary-main"
                      >
                        <Link
                          href={`/dashboard/products/edit-product/${product.id}`}
                          aria-label="edit-product"
                        >
                          <OperationIcon color={"primary"}>
                            <EditIcon styles="size-6" />
                          </OperationIcon>
                        </Link>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex-center bg-state-error-200 rounded-xl text-center text-bodySmall text-state-error py-5 px-3 mx-3">
          محصولی با تعداد زیر 10 موجود نیست.
        </div>
      )}
    </div>
  );
};

export default LowStockAlert;
