import React from "react";
import Button from "../../../button/button";
import ShopIcon from "@/app/icons/shop-icon";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import Link from "next/link";
import BurgerMenuIcon from "@/app/icons/burger-menu-icon";

type Props = {
  productId: string;
};

const HeroButtons = ({ productId }: Props) => {



  
  return (
    <div className="flex flex-col gap-3 w-full blgxl:flex-row blgxl:gap-4">
      <Link href={`/products/${productId}`}>
        <Button color="primary-main" icon={<BurgerMenuIcon styles="size-6 w-full"/>}>
          جزییات بیشتر
        </Button>
      </Link>
      <Button color="primary-main" icon={<HeartEmptyIcon />} outline>
        افزودن به علاقه مندی ها
      </Button>
    </div>
  );
};

export default HeroButtons;
