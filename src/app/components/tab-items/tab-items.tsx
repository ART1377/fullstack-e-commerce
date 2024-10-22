import React from "react";

type Props = {
  tabItems: string[];
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

const TabItems = ({
  tabItems,
  currentTab,
  setCurrentTab,
}: Props) => {
  return (
    <div className="w-full border-b-2 border-primary-light py-3 flex mb-4">
      {tabItems.map((item: string) => {
        return (
          <div
            key={item}
            onClick={() => setCurrentTab(item)}
            className={`py-1 px-3 rounded-lg cursor-pointer text-bodySmall custom-transition sm:text-bodyMain ${
              currentTab === item
                ? "text-primary-main bg-primary-200 hover:bg-primary-300"
                : "text-primary-light hover:text-primary-main"
            }`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default TabItems;
