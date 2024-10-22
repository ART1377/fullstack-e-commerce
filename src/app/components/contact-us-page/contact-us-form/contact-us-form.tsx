"use client";

import React, { useState } from "react";
import Input from "../../form/input/input";
import TextArea from "../../form/text-area/text-area";
import Button from "../../button/button";
import Title from "../../title/title";

type Props = {};

const ContactUsForm = (props: Props) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");

  return (
    <div className="w-full flex flex-col gap-4 items-center sm:w-[calc(50%-8px)]">
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
        label="نام"
        name="name"
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <Input
        label="ایمیل"
        name="email"
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <TextArea
        label="متن پیام"
        name="message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <Button styles="w-full mt-2" size="large">
        ارسال
      </Button>
    </div>
  );
};

export default ContactUsForm;
