import React from "react";
import Button from "../../../button/button";
import ShopIcon from "@/app/icons/shop-icon";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";

type Props = {};

const HeroButtons = (props: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full blgxl:flex-row blgxl:gap-4">
      <Button color="primary-main" icon={<ShopIcon />}>
        افزودن به سبد خرید
      </Button>
      <Button color="primary-main" icon={<HeartEmptyIcon />} outline>
        افزودن به علاقه مندی ها
      </Button>
    </div>
  );
};

export default HeroButtons;
