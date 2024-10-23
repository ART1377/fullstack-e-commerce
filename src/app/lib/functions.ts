import { Color, Stock } from "../../../next-type-models";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number => {
  return price - (price * discountPercentage) / 100;
};

export const timeAgo = (notificationDate: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - notificationDate.getTime());

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes} دقیقه پیش`;
  if (hours < 24) return `${hours} ساعت پیش`;
  return `${days} روز پیش`;
};

export const getUniqueColors = (stockItems: Stock[]): Color[] => {
  // Create a Map to store unique colors
  const colorMap = new Map<string, Color>();

  // Iterate over stock items to add unique colors
  stockItems.forEach((stockItem) => {
    const { color } = stockItem;

    // If the color is not already in the map, add it
    if (color) {
      if (!colorMap.has(color.id)) {
        colorMap.set(color.id, color);
      }
    }
  });

  // Convert the Map values back into an array of colors
  return Array.from(colorMap.values());
};

export const getUniqueSizes = (stockItems: Stock[]): string[] => {
  const sizes = stockItems.map((stockItem) => stockItem.size);

  const uniqueArray = sizes.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return uniqueArray;
};

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
