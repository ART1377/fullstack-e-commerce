import React from "react";
import Link from "next/link";
import type { Product, Color } from "../../../../../../next-type-d";
import { formatPrice, getUniqueColors } from "@/app/lib/functions";
import HeroButtons from "./../hero-buttons/hero-buttons";
import { motion } from "framer-motion"; // Import motion
import { colors } from "@/app/data/data";

type Props = {
  product: Product;
};

const HeroContent = ({ product }: Props) => {
  // get unique colors
  // need change - unique colors
  const productColors: Color[] = colors.slice(3);

  // animation
  const contentVariants = {
    hidden: { opacity: 0, x: -200 }, // Start off-screen left and invisible
    visible: { opacity: 1, x: 0 }, // End at normal position and visible
    exit: { opacity: 0, x: 200 }, // Exit off-screen right and invisible
  };

  return (
    <motion.div
      variants={contentVariants} // Use the defined variants
      initial="hidden" // Initial state
      animate="visible" // Animate to visible state
      exit="exit" // Animate out state
      transition={{
        duration: 0.5, // Duration of the animation
      }}
      className="w-full flex flex-col gap-5 mt-[20%] sm:mt-[15%] md:w-6/12 md:mt-0 md:gap-8"
    >
      {" "}
      <div>
        <Link
          href={`products/${product.category}/${product.id}`}
          className="h6 text-dark custom-transition hover:text-primary-main md:font-bold md:text-[24px] lg:text-[40px]"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-bodyMain text-customGray-600 line-clamp-2 md:line-clamp-3 md:text-base md:mt-2">
          {product.description}
        </p>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            برند
          </div>
          <div className="w-7/12 text-primary-main text-bodyMain md:text-xl">
            {product.brand}
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            مدل
          </div>
          <div className="w-7/12 text-primary-main text-bodyMain md:text-xl">
            {product.model}
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            قیمت
          </div>
          <div className="w-7/12 text-primary-main text-bodyMain md:text-xl">
            {formatPrice(product.price)}
            <span className="mr-1">تومان</span>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-5/12 text-dark text-bodyMain md:text-lg lg:text-[20px]">
            رنگ
          </div>
          <div className="w-7/12 flex gap-2">
            {productColors.slice(0, 4).map((color: Color) => (
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
      <HeroButtons />
    </motion.div>
  );
};

export default HeroContent;
