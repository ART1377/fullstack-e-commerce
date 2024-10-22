import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

const DashedContainer = ({ label, children }: Props) => {
  return (
    <div className="flex gap-7 rounded-lg border border-dashed border-customGray-500 p-4 pt-6 relative">
      <div className="bg-white py-1 px-4 text-customGray-700 text-bodyMain absolute -top-[18px] right-4">
        {label}
      </div>
      {children}
    </div>
  );
};

export default DashedContainer;
