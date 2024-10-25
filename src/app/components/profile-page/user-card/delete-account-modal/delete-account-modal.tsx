"use client";

import React from "react";
import Button from "@/app/components/button/button";
import Modal from "@/app/components/modal/modal";
import CloseIcon from "@/app/icons/close-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import { useFormState } from "react-dom";

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
  const [formState, action] = useFormState(
    actions.deleteUserByUser.bind(null, selectedUserId),
    { state: {} }
  );

  // const submitHandler = async (e: FormEvent) => {
  //   action();

  //   setIsDeleteModalOpen(false);
  //   // Custom signOut and refresh page
  //   // await signOut({ redirect: false }); // Custom behavior for signOut
  //   // // window.location.reload(); // Refresh page after signing out
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    await action(); // Call the delete action

    if (!formState.state?.success) {
      return;
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  console.log("formState", formState);

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
        <form onSubmit={handleSubmit} className="flex gap-5">
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
