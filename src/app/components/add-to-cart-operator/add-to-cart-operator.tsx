import React from "react";
import OperationIcon from "../operation-icon/operation-icon";
import ShopIcon from "@/app/icons/shop-icon";
import PlusIcon from "@/app/icons/plus-icon";
import MinusIcon from "@/app/icons/minus-icon";

type Props = {
  isInCart: boolean;
};

const AddToCartOperator = ({ isInCart }: Props) => {
  return (
    <>
      {isInCart ? (
        <div className="flex items-center gap-1.5">
          <div className="custom-shape size-8 text-bodyMain text-white bg-primary-main flex-center custom-transition hover:opacity-60 cursor-pointer">
            <PlusIcon size={32} />
          </div>
          <div className="text-bodyMain text-dark">1</div>
          <div className="custom-shape size-8 text-bodyMain text-white bg-primary-light flex-center custom-transition hover:opacity-60 cursor-pointer">
            <MinusIcon size={32} />
          </div>
        </div>
      ) : (
        <OperationIcon color={"primary"}>
          <ShopIcon />
        </OperationIcon>
      )}
    </>
  );
};

export default AddToCartOperator;
