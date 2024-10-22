import BurgerMenuIcon from '@/app/icons/burger-menu-icon';
import React from 'react'

type Props = {
  setIsSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarToggle = ({ setIsSidebarOpen }: Props) => {
  return (
    <div
      onClick={() => setIsSidebarOpen((prev) => !prev)}
      className="flex-center bg-customGray-100 rounded-full size-10 cursor-pointer custom-transition hover:bg-customGray-200 sm:hidden"
    >
      <BurgerMenuIcon />
    </div>
  );
};

export default SidebarToggle