"use client";
import React, { useState } from "react";
import NavbarToggle from "./navbar-toggle/navbar-toggle";
import Logo from "@/app/components/logo/logo";
import HeaderProfile from "./header-profile/header-profile";
import HeaderCart from "./header-cart/header-cart";
import Navbar from "./navbar/navbar";
import HeaderSearchBar from "./header-search-bar/header-search-bar";


type Props = {};

const Header = (props: Props) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <>
      <header className="main-header flex flex-col gap-6 py-6 px-3 rounded-3xl sm:mt-4 sm:mx-2 md:mx-4 sm:py-4">
        <div className="flex flex-col gap-6">
          <div className="flex-center-between">
            <div className="sm:hidden">
              <NavbarToggle
                isNavbarOpen={isNavbarOpen}
                setIsNavbarOpen={setIsNavbarOpen}
              />
            </div>
            <Logo />
            <div className="hidden w-full max-w-[300px] md:max-w-[380px] sm:block">
              <HeaderSearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
            <div className="flex gap-2">
              <HeaderProfile />
              <HeaderCart />
            </div>
          </div>
          <div className="w-full sm:hidden">
            <HeaderSearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
        </div>
        <Navbar isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      </header>
    </>
  );
};

export default Header;
