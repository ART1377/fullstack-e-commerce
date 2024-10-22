import React from "react";

type Props = {
  pendingOrdersCount: number;
  deliveredOrdersCount: number;
  returnedOrdersCount: number;
};

const ProfilePageOrdersStatus = ({
  pendingOrdersCount,
  deliveredOrdersCount,
  returnedOrdersCount,
}: Props) => {
    
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center gap-2">
        <div className="size-20 rounded-xl flex-center bg-state-warning text-white text-h4 lg:size-28 lg:text-h2">
          {pendingOrdersCount}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="size-20 rounded-xl flex-center bg-state-success text-white text-h4 lg:size-28 lg:text-h2">
          {deliveredOrdersCount}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="size-20 rounded-xl flex-center bg-state-error text-white text-h4 lg:size-28 lg:text-h2">
          {returnedOrdersCount}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageOrdersStatus;
