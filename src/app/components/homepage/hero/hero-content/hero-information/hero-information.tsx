import React from "react";
import Link from "next/link";
import { getUniqueColors } from "@/app/lib/get-unique-colors";
import HeroButtons from "./hero-buttons/hero-buttons";
import { motion } from "framer-motion"; // Import motion
import Price from "@/app/components/price/price";
import { Color, Product } from "../../../../../../../next-type-models";

type Props = {
  product: Product;
};

const HeroInformation = ({ product }: Props) => {
  const { title, description, id, brand, model, stock, discount, price } =
    product;

  // Get unique colors
  const uniqueColors = getUniqueColors(stock!);

  // animation
  const contentVariants = {
    hidden: { opacity: 0 }, // Start off-screen left and invisible
    visible: { opacity: 1 }, // End at normal position and visible
  };

  return (
    <motion.div
      variants={contentVariants} // Use the defined variants
      initial="hidden" // Initial state
      animate="visible" // Animate to visible state
      transition={{
        duration: 0.5, // Duration of the animation
      }}
      className="w-full flex flex-col gap-5 mt-[20%] sm:mt-[15%] md:w-6/12 md:mt-0 md:gap-8"
    >
      <div>
        <Link
          href={`products/${id}`}
          aria-label="product"
          className="h6 text-dark custom-transition hover:text-primary-main md:font-bold md:text-[24px] lg:text-[40px]"
        >
          {title}
        </Link>
        <p className="mt-1 text-bodyMain text-customGray-600 line-clamp-2 md:text-base md:mt-2">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            برند
          </div>
          <div className="w-7/12 text-primary-main text-bodyMain md:text-xl">
            {brand}
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            مدل
          </div>
          <div className="w-7/12 text-primary-main text-bodyMain md:text-xl">
            {model}
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            قیمت
          </div>

          {/* <div className="w-7/12 text-primary-main text-bodyMain md:text-xl">
            {formatPrice(product.price)}
            <span className="mr-1">تومان</span>
          </div> */}
          <Price
            discountPercentage={discount ? discount : undefined}
            price={price}
            size="large"
          />
        </div>
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            رنگ
          </div>
          <div className="w-7/12 flex gap-2">
            {uniqueColors.slice(0, 4).map((color: Color) => (
              <div
                key={color.id}
                style={{ backgroundColor: color.hex }}
                className={`size-6 rounded-lg 
                  md:size-8 ${
                    color.title === "white" && "border border-customGray-300"
                  }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <HeroButtons productId={id} />
    </motion.div>
  );
};

export default HeroInformation;
