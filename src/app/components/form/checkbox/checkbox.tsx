"use client";

import React, { useState } from "react";

type Props = {
  label: string;
  name: string;
  checked: boolean;
  handleCheckboxChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const Checkbox = ({
  label = "",
  name,
  checked,
  handleCheckboxChange,
}: Props) => {
  return (
    <label className="flex items-center gap-1 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheckboxChange((prev) => !prev)}
        className="hidden"
        name={name}
      />
      <span
        className={`border-2 border-dark rounded custom-transition ${
          checked ? `bg-dark` : ""
        }`}
        style={{ width: 18, height: 18 }}
      ></span>
      <span className="text-dark mt-1 group-hover:text-primary-main">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
