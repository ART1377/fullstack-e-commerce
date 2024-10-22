const jalaali = require("jalaali-js");

// Convert a JavaScript Date object from Prisma (e.g., Sun Oct 13 2024)
export function formatToJalali(prismaDate:any) {
  const gregorianDate = new Date(prismaDate); // Convert Prisma date to JS Date

  // Convert the Gregorian date to Jalali (Persian) date
  const jalaliDate = jalaali.toJalaali(gregorianDate);

  // Format it as 'YYYY/MM/DD'
  const formattedDate = `${jalaliDate.jy}/${String(jalaliDate.jm).padStart(
    2,
    "0"
  )}/${String(jalaliDate.jd).padStart(2, "0")}`;

  return formattedDate;
}

