"use client";

import React, { useState } from "react";
import Input from "../../../form/input/input";
import Title from "../../../title/title";
import Button from "../../../button/button";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import Link from "next/link";
import toast from "react-hot-toast";
import { LoginFormState } from "@/app/actions/auth-actions/login-action";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/spinner/spinner";
import Modal from "@/app/components/modal/modal";
import DeleteIcon from "@/app/icons/delete-icon";
import CloseIcon from "@/app/icons/close-icon";

type Props = {};

const LoginForm = (props: Props) => {
  // const [formState, action] = useFormState(actions.handleLogin, { errors: {} });

  const [formState, setFormState] = useState<LoginFormState>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);

    // Show loading toast
    const loadingToastId = toast.loading("در حال ورود...");

    try {
      // Call server action
      const result = await actions.handleLogin({ state: {} }, formData);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Check response and show appropriate toast
      if (result.state.success) {
        toast.success("ورود با موفقیت انجام شد");
        router.push("/");
        // Optional: Redirect user if needed
      } else if (result.state.errors) {
        setFormState(result);
        toast.error("ورود ناموفق بود. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen((prev) => !prev)}
      >
        <div className="flex flex-col gap-7 items-center">
          <div className="bg-state-error-200 rounded-full flex-center size">
            <CloseIcon styles="text-state-error size-16" />
          </div>
          <div className="text-center flex flex-col gap-2">
            <p className="text-state-error text-h6">توجه !!!</p>
            <small className="text-dark text-bodyMain">
              با توجه به این که این سایت صرفا جهت ضمیمه شدن به رزومه طراحی شده
              برای مشاهده و امتحان بخش داشبورد از اطلاعات زیر برای ورود به عنوان
              ادمین استفاده کنید.
            </small>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-1 text-bodyMain">
                <small>
                  ایمیل : 
                </small>
                <small className="text-primary-main">
                  admin@gmail.com
                </small>
              </div>
              <div className="flex items-center gap-1 text-bodyMain">
                <small>
                  رمز عبور : 
                </small>
                <small className="text-primary-main">
                  123456
                </small>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsModalOpen((prev) => !prev)}
            color="state-error"
            outline
          >
            متوجه شدم
          </Button>
        </div>
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="w-full flex-center flex-col gap-4"
      >
        {/* form title */}
        <Title>
          <h1 className="text-bodyMain xs:text-bodyMainBold">ورود به سایت</h1>
        </Title>
        {/* inputs */}
        <Input
          label="ایمیل"
          name="email"
          type="email"
          error={formState?.state?.errors?.email?.[0]}
        />
        <Input
          label="رمز عبور"
          name="password"
          type="password"
          error={formState?.state?.errors?.password?.[0]}
        />

        {formState?.state?.errors?._form?.[0] && (
          <small className="text-state-error text-captionMain p-2 rounded-xl bg-state-error-200 mt-1 ml-auto">
            {formState?.state?.errors?._form?.[0]}
          </small>
        )}
        <Button
          type="submit"
          color="dark"
          styles="w-full mt-2"
          size="large"
          disabled={loading}
          loading={loading && <Spinner size={24} color="white" />}
        >
          ورود
        </Button>
        <div className="flex gap-3 justify-start w-full">
          <small className="text-bodySmall text-dark">کاربر جدید هستید؟ </small>
          <Link
            href={"/auth/sign-up"}
            className="text-primary-main text-bodySmallBold underline-offset-8 cursor-pointer custom-transition hover:underline"
          >
            ثبت نام
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
