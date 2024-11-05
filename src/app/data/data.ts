import { Color } from "../../../next-type-d";
import { SizeCategory } from "../../../next-type-models";

export const colors: Color[] = [
  {
    id: "1",
    title: "red",
    hex: "#FF0000",
    persian: "قرمز",
  },
  {
    id: "2",
    title: "green",
    hex: "#00FF00",
    persian: "سبز",
  },
  {
    id: "3",
    title: "blue",
    hex: "#0000FF",
    persian: "آبی",
  },
  {
    id: "4",
    title: "yellow",
    hex: "#FFFF00",
    persian: "زرد",
  },
  {
    id: "5",
    title: "orange",
    hex: "#FFA500",
    persian: "نارنجی",
  },
  {
    id: "6",
    title: "purple",
    hex: "#800080",
    persian: "بنفش",
  },
  {
    id: "7",
    title: "pink",
    hex: "#FFC0CB",
    persian: "صورتی",
  },
  {
    id: "8",
    title: "brown",
    hex: "#A52A2A",
    persian: "قهوه‌ای",
  },
  {
    id: "9",
    title: "black",
    hex: "#000000",
    persian: "مشکی",
  },
  {
    id: "10",
    title: "white",
    hex: "#FFFFFF",
    persian: "سفید",
  },
];

export const sizes: SizeCategory[] = [
  {
    category: "shoe",
    persian: "کفش",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
  },
  {
    category: "clothes",
    persian: "پوشاک",
    sizes: ["S", "M", "L", "XL", "2XL", "3xl", "4xl"],
  },
  {
    category: "tent",
    persian: "چادر",
    sizes: ["6", "12", "18", "24"],
  },
  {
    category: "cooking",
    persian: "لوازم آشپزی",
    sizes: ["S", "M", "L"],
  },
  {
    category: "backpack",
    persian: "کوله پشتی",
    sizes: ["S", "M", "L"],
  },
];
