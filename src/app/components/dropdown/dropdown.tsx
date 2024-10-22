"use client";

import React, { useState, useRef, useEffect } from "react";
import ArrowBottomIcon from "@/app/icons/arrow-bottom-icon";

type Props = {
  label: React.ReactNode; // The original label
  items: {
    title: string;
    icon?: React.ReactNode;
  }[];
  onSelectItem:
    | React.Dispatch<React.SetStateAction<string | null>>
    | ((item: string | null) => void); // Callback to notify the parent of the selected item
  selectedItem: string | null; // Pass the selected item from the parent to control dropdown state externally
  styles?: string;
};

const Dropdown = ({ label, items, onSelectItem, selectedItem,styles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(selectedItem); // Sync with selectedItem prop
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync activeItem with the selectedItem prop when it changes in the parent
  useEffect(() => {
    setActiveItem(selectedItem);
  }, [selectedItem]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (itemTitle: string) => {
    if (activeItem === itemTitle) {
      // If the clicked item is already active, deactivate it and notify the parent
      setActiveItem(null);
      onSelectItem(null);
    } else {
      // Set the clicked item as active and notify the parent
      setActiveItem(itemTitle);
      onSelectItem(itemTitle);
    }
    setIsOpen(false); // Close the dropdown after selecting
  };

  return (
    <div ref={dropdownRef} className={`relative cursor-pointer h-full`}>
      <div
        className={`text-dark w-full h-full flex justify-between items-center p-3 rounded-xl custom-transition hover:text-primary-main ${styles}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {activeItem ? (
          <div className="flex items-center gap-1">
            <div className="size-6">
              {items.find((item) => item.title === activeItem)?.icon}
            </div>
            {activeItem}
          </div>
        ) : (
          label
        )}

        <div className={`custom-transition ${isOpen ? "rotate-180" : ""}`}>
          <ArrowBottomIcon styles="size-6" />
        </div>
      </div>

      {/* Dropdown content */}
      <div
        className={`custom-scrollbar min-w-max absolute right-0 mt-1 z-[2] w-full bg-white rounded-xl shadow-lg border border-primary-300 overflow-y-auto overflow-x-hidden custom-transition
        ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="p-1 flex flex-col gap-1 min-w-max">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-1 p-2 text-dark rounded-lg custom-transition hover:bg-primary-200 hover:text-primary-main cursor-pointer ${
                activeItem === item.title
                  ? "bg-primary-300 text-primary-main"
                  : ""
              }`}
              onClick={() => handleItemClick(item.title)}
            >
              {item.icon && <div className="size-6">{item.icon}</div>}
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
