"use client";

import React, { useState } from "react";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import ShareIcon from "@/app/icons/share-icon";
import Modal from "@/app/components/modal/modal";
import CloseIcon from "@/app/icons/close-icon";
import Share from "@/app/components/share/share";

type Props = {};

const ProductShare = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsModalOpen((prev) => !prev)}>
        <OperationIcon color="success">
          <ShareIcon styles="size-5" />
        </OperationIcon>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen((prev) => !prev)}
        header={
          <div className="w-full h-14 bg-primary-100 flex items-center justify-between px-4 py-2 text-bodyMain text-primary-main">
            <span>اشتراک گذاری</span>
            <button
              className="custom-transition rounded-full p-0.5 hover:bg-primary-200"
              onClick={() => setIsModalOpen(false)}
            >
              <CloseIcon styles="size-6" />
            </button>
          </div>
        }
      >
        <Share />
      </Modal>
    </>
  );
};

export default ProductShare;
