import React from "react";
import HomeIcon from "@/app/icons/home-icon";
import ShoeIcon from "@/app/icons/shoe-icon";
import BackpackIcon from "@/app/icons/backpack-icon";
import TentIcon from "@/app/icons/tent-icon";
import ClothesIcon from "@/app/icons/clothes-icon";
import CallIcon from "@/app/icons/call-icon";
import CloseIcon from "@/app/icons/close-icon";
import NavbarItem from "../nabvar-item/nabvar-item";
import { NavbarItemType } from "../../../../../next-type-models";
import { AnimatePresence, motion } from "framer-motion";

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

export const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.3,
    },
  }),
};

// Define animation variants for the navbar container
export const navVariants = {
  hidden: { x: "100%" }, // Start off-screen to the left
  visible: {
    x: 0, // Slide in from left
    transition: { duration: 0.3 },
  },
  exit: { x: "100%", transition: { duration: 0.3 } }, // Slide out to left
};

const Navbar = ({ isNavbarOpen, setIsNavbarOpen }: Props) => {
  // Define animation variants for individual items

  return (
    <>
      {/* mobile size */}

      <AnimatePresence>
        {isNavbarOpen && (
          <motion.nav
            key="navbar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={navVariants}
            className={`fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen bg-primary-main sm:hidden`}
          >
            <ul className="flex flex-col gap-10 h-full justify-center">
              <AnimatePresence>
                {navbarItems.map((nav: NavbarItemType, index) => {
                  return (
                    <motion.li
                      key={nav.title}
                      custom={index} // Pass the index to use in the staggered animation
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={navItemVariants}
                    >
                      <NavbarItem
                        key={nav.title}
                        navbarItem={nav}
                        onCloseNavbar={setIsNavbarOpen}
                      />
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            <div
              onClick={() => setIsNavbarOpen((prev) => !prev)}
              className="absolute left-5 top-5 cursor-pointer custom-transition rounded-full text-white hover:bg-white hover:text-primary-main"
            >
              <CloseIcon styles="size-8" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* desktop size */}
      <AnimatePresence>
        <motion.nav
          key="navbar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={navVariants}
          className={`hidden fixed top-0 left-0 right-0 bottom-0 z-10 sm:relative w-full h-auto bg-transparent sm:block`}
        >
          <ul className="flex h-full justify-center flex-row gap-1 md:gap-2">
            <AnimatePresence>
              {navbarItems.map((nav: NavbarItemType, index) => {
                return (
                  <motion.li
                    key={nav.title}
                    custom={index} // Pass the index to use in the staggered animation
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={navItemVariants}
                  >
                    <NavbarItem
                      key={nav.title}
                      navbarItem={nav}
                      onCloseNavbar={setIsNavbarOpen}
                    />
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
          <div
            onClick={() => setIsNavbarOpen((prev) => !prev)}
            className="absolute left-5 top-5 cursor-pointer custom-transition rounded-full text-white hover:bg-white hover:text-primary-main hidden"
          >
            <CloseIcon styles="size-8" />
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

export default Navbar;
