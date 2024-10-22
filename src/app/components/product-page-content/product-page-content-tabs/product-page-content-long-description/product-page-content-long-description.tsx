import React from 'react'

type Props = {
  longDescription:string;
};

const ProductPageContentLongDescription = ({ longDescription }: Props) => {
  return (
    <div className="flex flex-col gap-10 text-dark text-bodyMain">
      <p className="leading-8">{longDescription}</p>
    </div>
  );
};

export default ProductPageContentLongDescription