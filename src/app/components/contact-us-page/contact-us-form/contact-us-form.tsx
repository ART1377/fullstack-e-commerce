"use client";

import React, { useState } from "react";
import Input from "../../form/input/input";
import TextArea from "../../form/text-area/text-area";
import Button from "../../button/button";
import Title from "../../title/title";
import { useSessionContext } from "@/app/context/useSessionContext";
import { ContactUsFormState } from "@/app/actions/contact-us-actions/contact-us-actions";
import toast from "react-hot-toast";
import * as actions from "@/app/actions/contact-us-actions/contact-us-actions";
import Spinner from "../../spinner/spinner";

type Props = {};

const ContactUsForm = (props: Props) => {
  const { session } = useSessionContext();
  const sessionExist = !!session && !!session?.user;

  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState<ContactUsFormState>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sessionExist) return toast.error("ابتدا وارد سایت شوید");

    setLoading(true);
    const loadingToastId = toast.loading("در حال ثبت پیام...");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await actions.createContactUsMessage({}, formData);

      toast.dismiss(loadingToastId);
      if (response.success) {
        toast.success("ثبت پیام با موفقیت انجام شد");
      } else {
        setFormState(response);
        toast.error(response.errors?._form?.[0] || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 items-center sm:w-[calc(50%-8px)]"
    >
      {/* form title */}
      <div className="text-center w-full">
        <Title>
          <h1 className="text-bodyMain xs:text-bodyMainBold">تماس با ما</h1>
        </Title>
        <h2 className="text-bodySmall text-customGray-700 mt-1">
          پیام خود را برای ما ارسال کنید
        </h2>
      </div>
     
      {/* inputs */}
      <Input
        label="موضوع"
        name="title"
        type="text"
        error={formState?.errors?.title?.[0]!}
      />
      <TextArea
        label="متن پیام"
        name="message"
        error={formState?.errors?.message?.[0]!}
      />
      <Button
        type="submit"
        styles="w-full mt-2"
        size="large"
        disabled={loading}
        loading={loading && <Spinner size={20} color="white" />}
      >
        ارسال
      </Button>
    </form>
  );
};

export default ContactUsForm;
