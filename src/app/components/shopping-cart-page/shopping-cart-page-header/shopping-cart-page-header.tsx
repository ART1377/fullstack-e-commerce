import React from 'react'
import OperationIcon from '../../operation-icon/operation-icon';
import DeleteIcon from '@/app/icons/delete-icon';

type Props = {
  productsCount:number;
};

const ShoppingCartPageHeader = ({ productsCount }: Props) => {
  return (
    <div className="bg-white rounded-xl flex items-center justify-between py-2 px-3 shadow">
      <p className="text-bodyMain text-dark">سبد خرید</p>
      <div className="text-bodySmall text-customGray-700">
        <span className="ml-1">{productsCount}</span>
        محصول
      </div>
      <OperationIcon color={"error"}>
        <DeleteIcon styles="size-6" />
      </OperationIcon>
    </div>
  );
};

export default ShoppingCartPageHeader