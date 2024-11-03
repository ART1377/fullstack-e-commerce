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
            <tr className="text-customGray-500 text-right border-b border-t border-customGray-300 table-auto">
              <th className="text-bodySmall p-2 whitespace-nowrap">نام کاربر</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">ایمیل</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">تاریخ عضویت</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">
                تعداد سفارشات
              </th>
              <th className="text-bodySmall p-2 whitespace-nowrap">مجموع خرید</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">آخرین سفارش</th>
              <th className="text-bodySmall p-2 whitespace-nowrap"></th>
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
