import BurgerMenuIcon from "@/app/icons/burger-menu-icon";
import React from "react";

type Props = {
  isNavbarOpen: boolean;
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarToggle = ({ isNavbarOpen, setIsNavbarOpen }: Props) => {
  return (
    <div
      onClick={() => setIsNavbarOpen((prev) => !prev)}
      className="flex-center bg-customGray-100 rounded-full size-10 cursor-pointer hover:bg-customGray-200 custom-transition"
    >
      <BurgerMenuIcon styles="size-6" />
    </div>
  );
};

export default NavbarToggle;
