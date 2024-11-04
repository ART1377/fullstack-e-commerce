import React from "react";
import ShoeIcon from "@/app/icons/shoe-icon"
import BackpackIcon from "@/app/icons/backpack-icon";
import ClothesIcon from "@/app/icons/clothes-icon";
import TentIcon from "@/app/icons/tent-icon";
import CookIcon from "@/app/icons/cook-icon";
import Image from "next/image";
import CategoryItem from "./category-item/category-item";
import { CategoryItemType } from "../../../../../next-type-models";


export const categoryItems: CategoryItemType[] = [
  {
    title: "کفش",
    icon: <ShoeIcon />,
  },
  {
    title: "کوله پشتی",
    icon: <BackpackIcon />,
  },
  {
    title: "پوشاک",
    icon: <ClothesIcon />,
  },
  {
    title: "چادر",
    icon: <TentIcon />,
  },
  {
    title: "لوازم آشپزی",
    icon: <CookIcon />,
  },
];

type Props = {};

const Category = (props: Props) => {

  return (
    <>
      <section className="mt-44 lg:mt-56 w-full">
        <div className="text-center w-fit mx-auto px-5 py-3 rounded-3xl bg-primary-200 text-primary-main text-bodyMainBold md:px-10 md:text-h6 lg:px-16 lg:text-h4">
          <h2>دسته بندی محصولات</h2>
        </div>

        <div className="mt-6 mb-4 lg:mt-12 flex justify-center flex-wrap gap-5 md:gap-8 lg:gap-10">
          {categoryItems.map((category: CategoryItemType) => {
            return <CategoryItem key={category.title} category={category} />;
          })}
        </div>
        <div className="relative w-full h-[100px]">
          <Image
            alt="wavy-vector"
            src={"/images/category-vector.png"}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Category;
