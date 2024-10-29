import Button from "@/app/components/button/button";
import Modal from "@/app/components/modal/modal";
import CloseIcon from "@/app/icons/close-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import React from "react";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import toast from "react-hot-toast";

type Props = {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUserId: string;
  selectedUserName: string;
};

const DeleteUserModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedUserId,
  selectedUserName,
}: Props) => {

    
 const handleDelete = async () => {
   // Show loading toast
   const loadingToastId = toast.loading("در حال حذف کاربر...");

   try {
     const response = await actions.deleteUserByAdmin(selectedUserId);
     // Dismiss the loading toast
     toast.dismiss(loadingToastId);

     if (response.success) {
       // Show success toast
       toast.success("کاربر با موفقیت حذف شد.");
     } else {
       // Show error toast
       toast.error(`خطا: ${response.error}`);
     }
   } catch (error) {
     // Dismiss loading toast on error
     toast.dismiss(loadingToastId);
     toast.error("خطا در حذف کاربر. لطفا دوباره تلاش کنید.");
   }

   setIsDeleteModalOpen(false); // Close the modal after deletion
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
            آیا از حذف کاربر با نام
            <span className="text-bodyMain mx-2 text-state-error">
              {`" ${selectedUserName} "`}
            </span>
            اطمینان دارید؟
          </small>
        </div>
        <div className="flex gap-5">
          <div onClick={handleDelete}>
            <Button
              color="state-error"
              icon={<DeleteIcon styles="size-6" />}
            >
              حذف
            </Button>
          </div>
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

export default DeleteUserModal;
