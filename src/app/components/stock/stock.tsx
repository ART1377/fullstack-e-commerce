import React from 'react'

type Props = {
  quantity:number;
};

const Stock = ({ quantity }: Props) => {
  return (
    <div
      className={`rounded-full px-3 py-0.5 flex-center text-bodySmallBold w-fit ${
        quantity > 0
          ? "bg-state-success-200 text-state-success"
          : "bg-state-error-200 text-state-error"
      }`}
    >
      {quantity > 0 ? "موجود" : "نا موجود"}
    </div>
  );
};

export default Stock