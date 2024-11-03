import { Stock } from "../../../next-type-d";

export const getUniqueSizes = (stockItems: Stock[]): string[] => {
  const sizes = stockItems.map((stockItem) => stockItem.size);

  const uniqueArray = sizes.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return uniqueArray;
};
