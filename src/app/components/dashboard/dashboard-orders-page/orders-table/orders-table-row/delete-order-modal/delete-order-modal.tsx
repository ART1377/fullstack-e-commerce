import Button from "@/app/components/button/button";
import Modal from "@/app/components/modal/modal";
import CloseIcon from "@/app/icons/close-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import React from "react";

type Props = {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteOrderModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}: Props) => {
  const deleteOrderHandler = () => {
    // connect db and delete user
    console.log(`order deleted`);

    // close modal after async operation
    setIsDeleteModalOpen((prev) => !prev);
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
            آیا از حذف این سفارش اطمینان دارید؟
          </small>
        </div>
        <div className="flex gap-5">
          <Button
            onClick={deleteOrderHandler}
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
        </div>
      </div>
    </Modal>
  );
};

export default DeleteOrderModal;
