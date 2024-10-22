import React from 'react'
import { Feature } from '../../../../../../next-type-d';

type Props = {
  features:Feature[];
};

const ProductPageContentFeatures = ({ features }: Props) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {features.map((feature: Feature, index: number) => {
        return (
          <div
            key={feature.id}
            className={`grid grid-cols-6 rounded-lg py-2 px-4 ${
              index % 2 == 0 ? "bg-primary-100" : "bg-primary-200"
            }`}
          >
            <p className="text-dark text-bodyMain col-span-3 sm:col-span-2">
              {feature.title}
            </p>
            <small className="text-customGray-700 text-bodySmall col-span-3 sm:col-span-4">
              {feature.description}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default ProductPageContentFeatures