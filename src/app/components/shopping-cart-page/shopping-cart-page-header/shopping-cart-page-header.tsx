"use client";

import React, { useState } from "react";
import OperationIcon from "../../operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import { useSessionContext } from "@/app/context/useSessionContext";
import toast from "react-hot-toast";
import { deleteCart } from "@/app/redux/slices/cartSlice";
import Spinner from "../../spinner/spinner";
import CloseIcon from "@/app/icons/close-icon";
import Button from "../../button/button";
import Modal from "../../modal/modal";

type Props = {
  totalQuantity: number;
};

const ShoppingCartPageHeader = ({ totalQuantity }: Props) => {
  const { session } = useSessionContext(); // Assume you're using the context to get the session

  const dispatch = useAppDispatch();
  const { items: cartItems, status } = useAppSelector((state) => state.cart);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteCart = async () => {
    if (!session || !session.user || !session.user.id) {
      toast.error("ابتدا وارد شوید");
      return;
    }
    try {
      await dispatch(deleteCart(session.user.id));
      setIsDeleteModalOpen((prev) => !prev);
      toast.success("سبد خرید خالی شد");
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  return (
    <>
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
              آیا از حذف سبد خرید خود اطمینان دارید؟
            </small>
          </div>
          <div className="flex gap-5">
            <Button
              onClick={handleDeleteCart}
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
      <div className="bg-white rounded-xl flex items-center justify-between py-2 px-3 shadow">
        <p className="text-bodyMain text-dark">سبد خرید</p>

        {status === "loading" ? (
          <div className="w-4 h-4">
            <Spinner size={12} />
          </div>
        ) : (
          <div className="text-bodySmall text-customGray-700">
            <span className="ml-1">{totalQuantity}</span>
            محصول
          </div>
        )}

        <div onClick={() => setIsDeleteModalOpen((prev) => !prev)}>
          <OperationIcon color={"error"}>
            <DeleteIcon styles="size-6" />
          </OperationIcon>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPageHeader;
