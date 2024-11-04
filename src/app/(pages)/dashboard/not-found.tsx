import React from "react";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from "../../icons/home-icon";
import Button from "../../components/button/button";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex-center flex-col gap-5">
      <div className="relative w-full max-w-[500px] aspect-video">
        <Image src={"/images/error-image.png"} alt={"error-image"} fill />
      </div>
      <p>صفحه ی موردنطر یافت نشد</p>
      <div className="flex gap-3">
        <Button icon={<HomeIcon styles="size-6" />}>
          <Link href={"/"}>بازگشت به خانه</Link>
        </Button>
      </div>
    </div>
  );
}
