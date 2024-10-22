import React from "react";
import Pagination from "@/app/components/pagination/pagination";
import UsersTableRow from "./users-table-row/users-table-row";
import { User } from "../../../../../../next-type-models";
import { PAGE_LIMIT } from "@/app/lib/values";

type Props = {
  totalItems: number;
  users: User[];
};

const UsersTable = ({ totalItems,users }: Props) => {


  return (
    <>
      <div className="overflow-x-auto custom-scrollbar mb-20">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-customGray-500 text-right border-b border-t border-customGray-300">
              <th className="text-bodySmall p-2 min-w-[240px]">نام کاربر</th>
              <th className="text-bodySmall p-2 min-w-[300px]">ایمیل</th>
              <th className="text-bodySmall p-2 min-w-[140px]">تاریخ عضویت</th>
              <th className="text-bodySmall p-2 min-w-[140px]">
                تعداد سفارشات
              </th>
              <th className="text-bodySmall p-2 min-w-[140px]">مجموع خرید</th>
              <th className="text-bodySmall p-2 min-w-[140px]">آخرین سفارش</th>
              <th className="text-bodySmall p-2 min-w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User, index: number) => (
              <UsersTableRow key={user.id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <Pagination totalItems={totalItems} itemsPerPage={PAGE_LIMIT} />
      </div>
    </>
  );
};

export default UsersTable;
