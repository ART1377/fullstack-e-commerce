import React from "react";
import { OptionItemType } from "../../../../../../next-type-models";


type Props = {
  option: OptionItemType;
  index: number;
};

const OptionItem = ({ option, index }: Props) => {
  const { description, icon, id, title } = option;

  return (
    <>
      {!!(index % 2) ? (
        <div className="flex items-center">
          <div className="w-[calc(100%-40px)] bg-primary-main rounded pl-14 pr-3 py-2 flex flex-col max-h-16 gap-1">
            <p className="text-bodyMainBold text-white line-clamp-1">{title}</p>
            <small className="text-captionMain text-white line-clamp-1">{description}</small>
          </div>
          <div className="custom-shape rounded-lg shadow-md size-20 flex-center bg-white -mr-10">
            {icon}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="custom-shape rounded-lg shadow-md size-20 flex-center bg-white -ml-10">
            {icon}
          </div>
          <div className="w-[calc(100%-40px)] bg-primary-main rounded pl-3 pr-14 py-2 flex flex-col max-h-16 gap-1">
            <p className="text-bodyMainBold text-white line-clamp-1">{title}</p>
            <small className="text-captionMain text-white line-clamp-1">{description}</small>
          </div>
        </div>
      )}
    </>
  );
};

export default OptionItem;
