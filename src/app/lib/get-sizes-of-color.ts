import { Stock } from "../../../next-type-models";

// Function to get all sizes for a specific color
export const getSizesForColor = (
  stockItems: Stock[],
  colorPersian: string
): string[] => {
  // Filter the stock items for the specified color
  const sizes = stockItems
    .filter((stockItem) => stockItem.color?.persian === colorPersian)
    .map((stockItem) => stockItem.size);

  // Return unique sizes by converting to Set and back to array
  return Array.from(new Set(sizes));
};
