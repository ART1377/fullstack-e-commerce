import React from "react";
import Link from "next/link";
import { CategoryItemType } from "../../../../../../next-type-models";

type Props = {
  category: CategoryItemType;
};

const CategoryItem = ({ category }: Props) => {
  const { icon, title } = category;

  return (
    <Link
      href={`products?page=1&selectedCategory=${title}`}
      aria-label="product-category"
      className="size-28 rounded-full flex-center flex-col gap-1 bg-primary-100 text-primary-main text-center cursor-pointer custom-transition hover:bg-primary-300 bmlg:size-32 lg:size-40"
    >
      <div className="size-14 lg:size-20 text-primary-main">{icon}</div>
      <p className="text-bodySmall md:text-bodyMain lg:text-h6">{title}</p>
    </Link>
  );
};

export default CategoryItem;
