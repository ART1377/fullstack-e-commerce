"use client";

import React from "react";
import Button from "@/app/components/button/button";
import Modal from "@/app/components/modal/modal";
import CloseIcon from "@/app/icons/close-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUserId: string;
};

const DeleteAccountModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedUserId,
}: Props) => {
  const router = useRouter();
  // const submitHandler = async (e: FormEvent) => {
  //   action();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Show loading toast
    const loadingToastId = toast.loading("در حال حذف حساب کاربری...");

    try {
      const response = await actions.deleteUserByUser(selectedUserId);
      // Dismiss the loading toast
      toast.dismiss(loadingToastId);

      if (response.success) {
        // Show success toast
        toast.success("حساب کاربری با موفقیت حذف شد.");

        setIsDeleteModalOpen(false);

        location.reload() 
      } else {
        // Show error toast
        toast.error(`خطا: ${response.error}`);
      }
    } catch (error) {
      // Dismiss loading toast on error
      toast.dismiss(loadingToastId);
      toast.error("خطا در حذف حساب کاربری. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen((prev) => !prev)}
    >
      <div className="flex flex-col gap-7 items-center">
        <div className="bg-state-error-200 rounded-full flex-center size">
          <CloseIcon styles="text-state-error size-16" />
        </div>
        <div className="text-center flex flex-col gap-2">
          <p className="text-dark text-h6">مطمئن هستید؟</p>
          <small className="text-dark text-bodyMain">
            آیا از حذف حساب کاربری خود اطمینان دارید؟
          </small>
        </div>
        <form onSubmit={handleDelete} className="flex gap-5">
          <Button
            type="submit"
            color="state-error"
            icon={<DeleteIcon styles="size-6" />}
          >
            حذف
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen((prev) => !prev)}
            color="state-error"
            outline
          >
            انصراف
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
