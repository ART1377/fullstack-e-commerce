"use client";

import React from "react";
import Input from "../../../form/input/input";
import Title from "../../../title/title";
import Button from "../../../button/button";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import Link from "next/link";
import { useFormState } from "react-dom";

type Props = {};

const LoginForm = (props: Props) => {
  const [formState, action] = useFormState(actions.handleLogin, { errors: {} });

  return (
    <form action={action} className="w-full flex-center flex-col gap-4">
      {/* form title */}
      <Title>
        <h1 className="text-bodyMain xs:text-bodyMainBold">ورود به سایت</h1>
      </Title>
      {/* inputs */}
      <Input
        label="ایمیل"
        name="email"
        type="email"
        error={formState.errors.email?.[0]}
      />
      <Input
        label="رمز عبور"
        name="password"
        type="password"
        error={formState.errors.password?.[0]}
      />

      {formState.errors._form?.[0] && (
        <small className="text-state-error text-captionMain p-2 rounded-xl bg-state-error-200 mt-1 ml-auto">
          {formState.errors._form?.[0]}
        </small>
      )}
      <Button type="submit" color="dark" styles="w-full mt-2" size="large">
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
  );
};

export default LoginForm;
