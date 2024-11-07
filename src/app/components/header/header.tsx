"use client";

import React, { useState } from "react";
import NavbarToggle from "./navbar-toggle/navbar-toggle";
import Logo from "@/app/components/logo/logo";
import HeaderProfile from "./header-profile/header-profile";
import HeaderCart from "./header-cart/header-cart";
import Navbar from "./navbar/navbar";
import HeaderSearchBar from "./header-search-bar/header-search-bar";
import { motion } from "framer-motion";

// Define animation variants with rotation and staggered delay
export const rollingFromLeftVariants = {
  hidden: { opacity: 0, x: -10, rotate: -180 }, // Start off-screen and rotated
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotate: 0, // Rotate to 0 degrees
    transition: {
      delay: i * 0.2, // Delay based on index
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const rollingFromRightVariants = {
  hidden: { opacity: 0, x: 10, rotate: 180 }, // Start off-screen and rotated
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0, // Rotate to 0 degrees
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const topToBottomVariants = {
  hidden: { opacity: 0, y: -40 }, // Start off-screen and rotated
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

type Props = {};

const Header = (props: Props) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <>
      <header className="main-header flex flex-col gap-6 py-6 px-3 rounded-3xl sm:mt-4 sm:mx-2 md:mx-4 sm:py-4">
        <div className="flex flex-col gap-6">
          <div className="flex-center-between">
            <motion.div
              custom={0} // First item
              initial="hidden"
              animate="visible"
              variants={rollingFromRightVariants}
              className="sm:hidden"
            >
              <NavbarToggle
                isNavbarOpen={isNavbarOpen}
                setIsNavbarOpen={setIsNavbarOpen}
              />
            </motion.div>

            <motion.div
              custom={0} // First item
              initial="hidden"
              animate="visible"
              variants={topToBottomVariants}
            >
              <Logo />
            </motion.div>
            <motion.div
              custom={0} // First item
              initial="hidden"
              animate="visible"
              variants={topToBottomVariants}
              className="hidden w-full max-w-[300px] md:max-w-[380px] sm:block"
            >
              <HeaderSearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </motion.div>
            <div className="flex gap-2">
              <motion.div
                custom={0} // First item
                initial="hidden"
                animate="visible"
                variants={rollingFromLeftVariants}
              >
                <HeaderProfile />
              </motion.div>

              <motion.div
                custom={1} // Second item
                initial="hidden"
                animate="visible"
                variants={rollingFromLeftVariants}
              >
                <HeaderCart />
              </motion.div>
            </div>
          </div>
          <motion.div
            custom={0} // First item
            initial="hidden"
            animate="visible"
            variants={topToBottomVariants}
            className="w-full sm:hidden"
          >
            <HeaderSearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </motion.div>
        </div>
        <Navbar isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      </header>
    </>
  );
};

export default Header;
