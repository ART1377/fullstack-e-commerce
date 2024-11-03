import { Color, Stock } from "../../../next-type-models";

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

