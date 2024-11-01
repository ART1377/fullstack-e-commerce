"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../../button/button";
import EditIcon from "@/app/icons/edit-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import DeleteAccountModal from "./delete-account-modal/delete-account-modal";
import EditAccountModal from "./edit-account-modal/edit-account-modal";
import { User } from "../../../../../next-type-models";
import { formatToJalali } from "@/app/lib/date-format";
import PersonIcon from "@/app/icons/person-icon";

type Props = {
  user: User;
};

const ProfilePageUserCard = ({ user }: Props) => {
  const { id, image, firstName, lastName, email, createdAt } = user;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <>
      <DeleteAccountModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedUserId={id}
      />
      <EditAccountModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedUserId={id}
        user={user}
      />

      <div className="bg-white p-3 rounded-xl shadow w-full h-fit mx-auto flex flex-col gap-7 md:w-[280px]">
        <div className="flex gap-y-7 gap-x-3 flex-col xs:flex-row md:flex-col">
        {/* user image */}
        <div className="w-full h-56 relative rounded-xl overflow-hidden shadow xs:max-w-[150px] xs:max-h-[150px] md:max-h-none md:max-w-none">
          {image ? (
            <Image
              alt={`${firstName} ${lastName}`}
              src={image!}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="flex-center h-full w-full bg-customGray-100 text-customGray-700">
              <PersonIcon styles="size-20" />
            </div>
          )}
        </div>
        {/* user personal info */}
        <div className="flex flex-col gap-4 justify-center xs:w-[calc(100%-170px)] md:w-full">
          <div className="flex justify-between">
            <small className="text-bodySmall text-customGray-500">نام</small>
            <p className="text-bodyMain text-dark">{firstName}</p>
          </div>
          <div className="flex justify-between">
            <small className="text-bodySmall text-customGray-500">
              نام خانوادگی
            </small>
            <p className="text-bodyMain text-dark">{lastName}</p>
          </div>
          <div className="flex justify-between">
            <small className="text-bodySmall text-customGray-500">ایمیل</small>
            <p className="text-bodyMain text-dark">{email}</p>
          </div>
          <div className="flex justify-between">
            <small className="text-bodySmall text-customGray-500">
              تاریخ عضویت
            </small>
            <p className="text-bodyMain text-dark">
              {formatToJalali(createdAt)}
            </p>
          </div>
        </div>
        </div>
        {/* buttons */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => setIsEditModalOpen((prev) => !prev)}
            color="primary-main"
            outline
            icon={<EditIcon styles="size-6" />}
          >
            ویرایش پروفایل
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen((prev) => !prev)}
            color="primary-main"
            icon={<DeleteIcon styles="size-6" />}
          >
            حذف حساب کاربری
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfilePageUserCard;
