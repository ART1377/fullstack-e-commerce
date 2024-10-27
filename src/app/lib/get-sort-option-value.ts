const sortOptions = [
  { title: "جدیدترین", value: "newest" },
  {
    title: "بیشترین لایک",
    value: "mostLikes",
  },
  {
    title: "بیشترین دیسلایک",
    value: "mostDislikes",
  },
];


export const getSortOptionValue = (persianName: string) => {
  const value = sortOptions.find((item) => {
    if (item.title === persianName) {
      return item.value;
    }
  })?.value;

  return value;
};
