"use client";

import React, { useState } from "react";
import Button from "@/app/components/button/button";
import Modal from "@/app/components/modal/modal";
import CloseIcon from "@/app/icons/close-icon";
import Input from "@/app/components/form/input/input";
import Image from "next/image";
import PersonIcon from "@/app/icons/person-icon";
import { User } from "../../../../../../next-type-models";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import { EditUserFormState } from "@/app/actions/auth-actions/edit-user-action";
import toast from "react-hot-toast";
import Spinner from "@/app/components/spinner/spinner";

type Props = {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUserId: string;
  user: User;
};

const EditAccountModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  user,
}: Props) => {
  const [firstNameInput, setFirstNameInput] = useState<string>(user.firstName);
  const [lastNameInput, setLastNameInput] = useState<string>(user.lastName);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>(user.email);
  const [image, setImage] = useState<string>("");
  const [cloudinaryImage, setCloudinaryImage] = useState<string>(user.image!);

  const [loading, setLoading] = useState(false);

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

  const [formState, setFormState] = useState<EditUserFormState>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);

    // Show loading toast
    const loadingToastId = toast.loading("در حال ویرایش پروفایل...");

    try {
      // Call server action
      const result = await actions.updateUser(
        cloudinaryImage,
        { state: {} },
        formData
      );

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Check response and show appropriate toast
      if (result.state.success) {
        toast.success("ویرایش پروفایل با موفقیت انجام شد");
        setIsEditModalOpen((prev) => !prev);
      } else if (result.state.errors) {
        setFormState(result);
        toast.error("ویرایش پروفایل ناموفق بود. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  // const [formState, action] = useFormState(
  //   actions.updateUser.bind(null, cloudinaryImage),
  //   {
  //     errors: {},
  //   }
  // );

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen((prev) => !prev)}
      header={
        <div className="w-full h-14 bg-primary-100 flex items-center justify-between px-4 py-2 text-bodyMain text-primary-main">
          <span>ویرایش پروفایل</span>
          <button
            className="custom-transition rounded-full p-0.5 hover:bg-primary-200"
            onClick={() => setIsEditModalOpen(false)}
          >
            <CloseIcon styles="size-6" />
          </button>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="w-full flex-center flex-col gap-4"
      >
        {/* user image */}
        <div className="flex flex-col items-center text-center gap-2 mb-7">
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
            ) : cloudinaryImage ? (
              <Image
                alt={user.firstName}
                src={cloudinaryImage}
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
              onChange={handleImageChange}
            />
            <p className="text-center text-primary-main text-bodyMain underline underline-offset-8 cursor-pointer custom-transition hover:opacity-60">
              تغییر عکس پروفایل
            </p>
          </label>
        </div>
        {/* form container */}
        {/* inputs */}
        <div className="grid gap-4 w-full sm:grid-cols-2">
          <Input
            label="نام"
            name="first-name"
            type="text"
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.target.value)}
            error={formState?.state?.errors?.firstName?.[0]}
          />
          <Input
            label="نام خانوادگی"
            name="last-name"
            type="text"
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.target.value)}
            error={formState?.state?.errors?.lastName?.[0]}
          />
        </div>
        <div className="grid gap-4 w-full sm:grid-cols-2">
          <Input
            label="رمز عبور"
            name="password"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            error={formState?.state?.errors?.password?.[0]}
          />
          <Input
            label="تکرار رمز عبور"
            name="confirm-password"
            type="password"
            value={confirmPasswordInput}
            onChange={(e) => setConfirmPasswordInput(e.target.value)}
            error={formState?.state?.errors?.confirmPassword?.[0]}
          />
        </div>
        <Input
          label="ایمیل"
          name="email"
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          error={formState?.state?.errors?.email?.[0]}
          disabled
        />
        {formState?.state?.errors?._form?.[0] && (
          <small className="text-state-error text-captionMain p-2 rounded-xl bg-state-error-200 mt-1 ml-auto">
            {formState?.state?.errors?._form?.[0]}
          </small>
        )}
        <Button
          type="submit"
          color="primary-main"
          styles="w-full mt-2"
          size="large"
          disabled={loading}
          loading={loading && <Spinner size={20} color="white" />}
        >
          نبت
        </Button>
      </form>
    </Modal>
  );
};

export default EditAccountModal;


