"use client";

import React, { useState } from "react";
import { formatPrice, getUniqueColors } from "@/app/lib/functions";
import OperationIcon from "../../../../operation-icon/operation-icon";
import EditIcon from "@/app/icons/edit-icon";
import Stock from "../../../../stock/stock";
import Image from "next/image";
import DeleteIcon from "@/app/icons/delete-icon";
import DeleteProductModal from "./delete-product-modal/delete-product-modal";
import Link from "next/link";
import { Color, Product } from "../../../../../../../next-type-models";
import Tooltip from "@/app/components/tooltip/tooltip";

type Props = {
  product: Product;
  index: number;
};

const ProductTableRow = ({ product, index }: Props) => {
  const { title, id, images, stock, discount, category, price } = product;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const uniqueColors = getUniqueColors(stock!);

  const totalQuantity = stock?.reduce(
    (acc, stockItem) => acc + stockItem.quantity,
    0
  );

  return (
    <>
      <DeleteProductModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedProductId={id}
        selectedProductName={title}
      />
      <tr
        key={id}
        className={`border-b border-customGray-300 custom-transition ${
          index % 2 !== 0
            ? "bg-customGray-100 hover:bg-customGray-200"
            : "bg-white hover:bg-customGray-200"
        }`}
      >
        <td className="p-2 flex items-center gap-2">
          <div className="size-12 rounded-xl shadow relative overflow-hidden">
            <Image
              alt={title}
              src={images?.[0].url!}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          {title}
        </td>
        <td className="p-2">{category}</td>
        <td className="p-2">{formatPrice(price)}</td>
        <td className="p-2">{totalQuantity}</td>
        <td className="p-2">{`${discount ? `${discount}%` : ""}`}</td>
        <td className="p-2">
          <div className="flex gap-1">
            {uniqueColors.slice(0, 3).map((color: Color) => (
              <div
                key={color.id}
                className={`size-5 rounded-full ${
                  color.title === "white" && "border border-customGray-300"
                }`}
                style={{ backgroundColor: color.hex }}
              ></div>
            ))}
            <span className="text-customGray-500 text-bodySmall">
              {uniqueColors.length > 3 && `(+${uniqueColors.length - 3})`}
            </span>
          </div>
        </td>
        <td className="p-2">
          <Stock quantity={totalQuantity!} />
        </td>
        <td className="p-2">
          <div className="flex gap-2">
            <Tooltip
              content="ویرایش محصول"
              position="right"
              color="primary-main"
            >
              <Link href={`/dashboard/products/edit-product/${id}`}>
                <OperationIcon color={"primary"}>
                  <EditIcon styles="size-6" />
                </OperationIcon>
              </Link>
            </Tooltip>
            <Tooltip content="حذف محصول" position="right" color="state-error">
              <div onClick={() => setIsDeleteModalOpen(true)}>
                <OperationIcon color={"error"}>
                  <DeleteIcon styles="size-6" />
                </OperationIcon>
              </div>
            </Tooltip>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductTableRow;
