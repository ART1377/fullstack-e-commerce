"use client";

import Button from "@/app/components/button/button";
import Input from "@/app/components/form/input/input";
import TextArea from "@/app/components/form/text-area/text-area";
import Modal from "@/app/components/modal/modal";
import Title from "@/app/components/title/title";
import { useSessionContext } from "@/app/context/useSessionContext";
import CloseIcon from "@/app/icons/close-icon";
import PlusIcon from "@/app/icons/plus-icon";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import * as actions from "@/app/actions/comment-actions/comment-actions";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Spinner from "@/app/components/spinner/spinner";
import ReplyIcon from "@/app/icons/reply-icon";

type Props = {
  parentId?: string;
  isReply?: boolean;
};

const CreateCommentModal = ({
  parentId = undefined,
  isReply = false,
}: Props) => {
  const { session } = useSessionContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const sessionExist = !!session && !!session?.user;

  const [loading, setLoading] = useState(false);

  const params = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const productId = params.id as string;

  const [formState, action] = useFormState(
    actions.createComment.bind(null, productId, parentId),
    { state: {} }
  );

  // const [formState, action, isPending] = useActionState(
  //   actions.createComment.bind(null, productId, parentId),
  //   { state: {} }
  // );

  // Form submission handler

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionExist) return toast.error("ابتدا وارد سایت شوید");

    setLoading(true);
    const loadingToastId = toast.loading("در حال ثبت پیام...");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await actions.createComment(
        productId,
        parentId,
        { state: {} },
        formData
      );

      toast.dismiss(loadingToastId);
      if (response.state.success) {
        toast.success("ثبت نظر با موفقیت انجام شد");
        setTitle("");
        setDescription("");
        setIsModalOpen(false);
      } else {
        toast.error(response.state.errors?._form?.[0] || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  // Show toast error if user is not logged in
  const handleUnauthenticatedClick = () => {
    if (!sessionExist) {
      toast.error("ابتدا وارد سایت شوید");
    }
  };

  return (
    <>
      {sessionExist ? (
        <>
          {isReply ? (
            <div
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="text-customGray-500 flex items-center justify-end gap-1 cursor-pointer ml-2 mt-2 custom-transition transform hover:-translate-x-0.5 hover:text-customGray-700"
            >
              <small className="text-bodySmall">پاسخ</small>
              <ReplyIcon styles="size-4" />
            </div>
          ) : (
            <Button
              icon={<PlusIcon styles="size-6" />}
              styles="mb-4"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              ایجاد پیام
            </Button>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen((prev) => !prev)}
            header={
              <div className="w-full h-14 bg-primary-100 flex items-center justify-between px-4 py-2 text-bodyMain text-primary-main">
                <span>ایجاد پیام</span>
                <button
                  className="custom-transition rounded-full p-0.5 hover:bg-primary-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  <CloseIcon styles="size-6" />
                </button>
              </div>
            }
          >
            <form
              onSubmit={handleSubmit}
              className="relative w-full flex flex-col gap-4 items-center"
            >
              {/* form title */}
              <div className="text-center w-full">
                <Title>
                  <p className="text-bodySmall text-customGray-700">
                    پیام خود را بگذارید
                  </p>
                </Title>
              </div>
              {/* inputs */}
              <Input
                label="موضوع"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={formState.state.errors?.title?.[0]}
              />
              <TextArea
                label="متن پیام"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={formState.state.errors?.description?.[0]}
              />
              <Button
                disabled={loading}
                loading={loading && <Spinner size={20} color="white" />}
                type="submit"
                styles="w-full mt-2"
                size="large"
              >
                ثبت
              </Button>{" "}
              {formState.state.errors?._form?.[0] && (
                <small className="text-state-error text-captionMain -mt-4">
                  {formState.state.errors?._form?.[0]}
                </small>
              )}
            </form>
          </Modal>
        </>
      ) : (
        <>
          {isReply ? (
            <div
              onClick={handleUnauthenticatedClick}
              className="text-customGray-500 flex items-center justify-end gap-1 cursor-pointer ml-2 mt-2 custom-transition transform hover:-translate-x-0.5 hover:text-customGray-700"
            >
              <small className="text-bodySmall">پاسخ</small>
              <ReplyIcon styles="size-4" />
            </div>
          ) : (
            <div
              onClick={handleUnauthenticatedClick}
              className="px-4 py-8 rounded-xl bg-state-error-200 text-state-error flex-center text-center text-bodyMain mb-4"
            >
              برای ایجاد پیام ابتدا
              <Link
                href={"/auth/login"}
                className="text-bodyMainBold mx-1 hover:underline underline-offset-8"
              >
                وارد
              </Link>
              شوید
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CreateCommentModal;
