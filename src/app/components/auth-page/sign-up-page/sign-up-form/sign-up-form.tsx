"use client";

import React, { useState } from "react";
import Input from "../../../form/input/input";
import Title from "../../../title/title";
import Button from "../../../button/button";
import Image from "next/image";
import PersonIcon from "@/app/icons/person-icon";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import Link from "next/link";
import { SighUpFormState } from "@/app/actions/auth-actions/sign-up-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const SignUpForm = (props: Props) => {
  // const [formState, action] = useFormState(actions.handleSignUp, {
  //   errors: {},
  // });

  const [image, setImage] = useState<string>("");

  const [formState, setFormState] = useState<SighUpFormState>();

  const router = useRouter();

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      const reader = new FileReader();

      // Update the preview URL
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage); // Read the file as a data URL
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Show loading toast
    const loadingToastId = toast.loading("در حال ثبت نام...");

    try {
      // Call server action
      const result = await actions.handleSignUp({ state: {} }, formData);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Check response and show appropriate toast
      if (result.state.success) {
        toast.success("ثبت نام با موفقیت انجام شد");
        router.push("/auth/login");
        // Optional: Redirect user if needed
      } else if (result.state.errors) {
        setFormState(result);
        toast.error("ثبت نام ناموفق بود. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex-center flex-col gap-4">
      {/* form title */}
      <Title>
        <h1 className="text-bodyMain xs:text-bodyMainBold">ثبت نام</h1>
      </Title>

      <div className="flex flex-col items-center text-center gap-2 mb-4">
        <div className="size-36 border-4 border-primary-main rounded-full shadow relative overflow-hidden flex-center">
          {image ? (
            <Image
              alt="user-name"
              src={image}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <PersonIcon styles="size-20 text-primary-main" />
          )}
        </div>
        <label htmlFor="image" className="cursor-pointer">
          <input
            type="file"
            id="image"
            name="image"
            className="w-full h-full hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="text-center text-primary-main text-bodyMain underline underline-offset-8 cursor-pointer custom-transition hover:opacity-60">
            انتخاب عکس پروفایل
          </p>
        </label>
      </div>
      {/* inputs */}

      <div className="grid gap-4 w-full bmlg:grid-cols-2">
        <Input
          label="نام"
          name="first-name"
          type="text"
          error={formState?.state?.errors?.firstName?.[0]}
        />
        <Input
          label="نام خانوادگی"
          name="last-name"
          type="text"
          error={formState?.state?.errors?.lastName?.[0]}
        />
      </div>
      <div className="grid gap-4 w-full bmlg:grid-cols-2">
        <Input
          label="رمز عبور"
          name="password"
          type="password"
          error={formState?.state?.errors?.password?.[0]}
        />
        <Input
          label="تکرار رمز عبور"
          name="confirm-password"
          type="password"
          error={formState?.state?.errors?.confirmPassword?.[0]}
        />
      </div>

      <Input
        label="ایمیل"
        name="email"
        type="email"
        error={formState?.state?.errors?.email?.[0]}
      />
      {formState?.state?.errors?._form?.[0] && (
        <small className="text-state-error text-captionMain p-2 rounded-xl bg-state-error-200 mt-1 ml-auto">
          {formState?.state?.errors?._form?.[0]}
        </small>
      )}
      <Button type="submit" color="dark" styles="w-full mt-2" size="large">
        نبت نام
      </Button>

      <div className="flex gap-3 justify-start w-full">
        <small className="text-bodySmall text-dark">
          قبلا ثبت نام کرده اید؟
        </small>
        <Link
          href={"/auth/login"}
          className="text-primary-main text-bodySmallBold underline-offset-8 cursor-pointer custom-transition hover:underline"
        >
          وارد شوید
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
