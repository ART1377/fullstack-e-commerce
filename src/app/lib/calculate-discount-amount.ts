export const calculateDiscountAmount = (
  price: number,
  discountPercentage: number
): number => {
  return (price * discountPercentage) / 100;
};
