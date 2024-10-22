import React from "react";
import type { NavbarItemType } from "../../../../../next-type-d";
import HomeIcon from "@/app/icons/home-icon";
import ShoeIcon from "@/app/icons/shoe-icon";
import BackpackIcon from "@/app/icons/backpack-icon";
import TentIcon from "@/app/icons/tent-icon";
import ClothesIcon from "@/app/icons/clothes-icon";
import CallIcon from "@/app/icons/call-icon";
import CloseIcon from "@/app/icons/close-icon";
import NavbarItem from "../nabvar-item/nabvar-item";

type Props = {
  isNavbarOpen: boolean;
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// data/navbarItems
const navbarItems: NavbarItemType[] = [
  {
    title: "خانه",
    path: "/",
    icon: <HomeIcon styles="size-6" />,
  },
  {
    title: "کفش",
    path: "/products?page=1&selectedCategory=کفش",
    icon: <ShoeIcon styles="size-6" />,
  },
  {
    title: "کوله پشتی",
    path: "/products?page=1&selectedCategory=کوله پشتی",
    icon: <BackpackIcon styles="size-6" />,
  },
  {
    title: "چادر",
    path: "/products?page=1&selectedCategory=چادر",
    icon: <TentIcon styles="size-6" />,
  },
  {
    title: "پوشاک",
    path: "/products?page=1&selectedCategory=پوشاک",
    icon: <ClothesIcon styles="size-6" />,
  },
  {
    title: "تماس با ما",
    path: "/contact-us",
    icon: <CallIcon styles="size-6" />,
  },
];

const Navbar = ({ isNavbarOpen, setIsNavbarOpen }: Props) => {
  return (
    <>
      <nav
        className={`${
          isNavbarOpen ? "block" : "hidden sm:block"
        } fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen bg-primary-main sm:relative sm:w-full sm:h-auto sm:bg-transparent`}
      >
        <ul className="flex flex-col gap-10 h-full justify-center sm:flex-row sm:gap-1 md:gap-2">
          {navbarItems.map((nav: NavbarItemType) => {
            return (
              <NavbarItem
                key={nav.title}
                navbarItem={nav}
                onCloseNavbar={setIsNavbarOpen}
              />
            );
          })}
        </ul>
        <div
          onClick={() => setIsNavbarOpen((prev) => !prev)}
          className="absolute left-5 top-5 cursor-pointer custom-transition rounded-full text-white hover:bg-white hover:text-primary-main sm:hidden"
        >
          <CloseIcon styles="size-8" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

// import React from "react";
// import { motion } from "framer-motion"; // Import Framer Motion
// import type { NavbarItemType } from "../../../../../next-type-d";
// import HomeIcon from "@/app/icons/home-icon";
// import ShoeIcon from "@/app/icons/shoe-icon";
// import BackpackIcon from "@/app/icons/backpack-icon";
// import TentIcon from "@/app/icons/tent-icon";
// import ClothesIcon from "@/app/icons/clothes-icon";
// import CallIcon from "@/app/icons/call-icon";
// import CloseIcon from "@/app/icons/close-icon";
// import NavbarItem from "../nabvar-item/nabvar-item";

// type Props = {
//   isNavbarOpen: boolean;
//   setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// // data/navbarItems
// const navbarItems: NavbarItemType[] = [
//   {
//     title: "خانه",
//     path: "/",
//     icon: <HomeIcon styles="size-6" />,
//   },
//   {
//     title: "کفش",
//     path: "/products?page=1",
//     icon: <ShoeIcon styles="size-6" />,
//   },
//   {
//     title: "کوله پشتی",
//     path: "/products?page=1",
//     icon: <BackpackIcon styles="size-6" />,
//   },
//   {
//     title: "چادر",
//     path: "/products?page=1",
//     icon: <TentIcon styles="size-6" />,
//   },
//   {
//     title: "پوشاک",
//     path: "/products?page=1",
//     icon: <ClothesIcon styles="size-6" />,
//   },
//   {
//     title: "تماس با ما",
//     path: "/contact-us",
//     icon: <CallIcon styles="size-6" />,
//   },
// ];

// const Navbar = ({ isNavbarOpen, setIsNavbarOpen }: Props) => {
//   return (
//     <>
//       {/* Framer Motion only applies to smaller screens */}
//       <motion.nav
//         initial={{ y: "-100%" }} // Start off-screen (top) for small screens
//         animate={{ y: isNavbarOpen ? "0%" : "-100%" }} // Animate into view when open
//         transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth transition
//         className={`${
//           isNavbarOpen ? "block" : "hidden"
//         } fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen bg-primary-main sm:hidden`} // Only apply to small screens
//       >
//         <ul className="flex flex-col gap-10 h-full justify-center">
//           {navbarItems.map((nav: NavbarItemType) => {
//             return (
//               <NavbarItem
//                 key={nav.title}
//                 navbarItem={nav}
//                 onCloseNavbar={setIsNavbarOpen}
//               />
//             );
//           })}
//         </ul>
//         <div
//           onClick={() => setIsNavbarOpen((prev) => !prev)}
//           className="absolute left-5 top-5 cursor-pointer custom-transition rounded-full text-white hover:bg-white hover:text-primary-main"
//         >
//           <CloseIcon styles="size-8" />
//         </div>
//       </motion.nav>

//       {/* Regular Navbar for screens larger than 'sm' */}
//       <nav className="hidden sm:block sm:relative sm:w-full sm:h-auto sm:bg-transparent">
//         <ul className="flex flex-row gap-1 w-fit mx-auto md:gap-2">
//           {navbarItems.map((nav: NavbarItemType) => {
//             return (
//               <NavbarItem
//                 key={nav.title}
//                 navbarItem={nav}
//                 onCloseNavbar={setIsNavbarOpen}
//               />
//             );
//           })}
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
