import React from "react";
import Link from "next/link";
import { NavbarItemType } from "../../../../../next-type-models";


type Props = {
  navbarItem: NavbarItemType;
  onCloseNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarItem = ({ navbarItem, onCloseNavbar }: Props) => {
  return (
    <li>
      <Link
        onClick={() => onCloseNavbar(false)}
        href={navbarItem.path}
        className="flex-center gap-1 text-white text-h6 font-medium custom-transition hover:scale-105 w-fit mx-auto px-2 py-1 rounded-lg sm:text-dark sm:text-bodyMain sm:hover:bg-primary-light 
        sm:hover:text-light sm:hover:scale-100 md:text-h6"
      >
        <div className="mb-1">{navbarItem.icon}</div>
        {navbarItem.title}
      </Link>
    </li>
  );
};

export default NavbarItem;
