import React from "react";
import { formatPrice } from "@/app/lib/functions";
import Link from "next/link";
import Image from "next/image";
import { formatToJalali } from "@/app/lib/date-format";

type Props = {
  order: {
    id: string;
    discountAmount: number;
    price: number;
    createdAt: Date;
    products: {
      title: string;
      id: string;
      image: string;
    }[];
    status: string;
  };
};

const ProfilePageOrderItem = ({ order }: Props) => {

  return (
    <div className="flex flex-col gap-3 mb-5">
      {/* tab content info */}
      <div className="flex flex-wrap gap-4">
        {order.discountAmount !== undefined && order.discountAmount > 0 && (
          <div className="flex items-center gap-1">
            <small className="text-bodySmall text-customGray-500">
              تخفیف :
            </small>
            <div className="text-bodyMain text-dark flex gap-1">
              {formatPrice(order.discountAmount)}
              <span>تومان</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <small className="text-bodySmall text-customGray-500">مبلغ :</small>
          <div className="text-bodyMain text-dark flex gap-1">
            {formatPrice(order.price)}
            <span>تومان</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <small className="text-bodySmall text-customGray-500">
            تعداد محصول :
          </small>
          <div className="text-bodyMain text-dark">{order.products.length}</div>
        </div>
        <div className="flex items-center gap-1">
          <small className="text-bodySmall text-customGray-500">تاریخ :</small>
          <div className="text-bodyMain text-dark">
            {formatToJalali(order.createdAt)}
          </div>
        </div>
      </div>
      {/* tab products */}
      <div className="bg-customGray-200 p-2 flex gap-4 overflow-x-auto custom-scrollbar">
        {order.products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="relative size-32 min-w-32 cursor-pointer custom-transition hover:opacity-60"
            >
              <Image
                alt={product.title}
                src={product.image}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePageOrderItem;
