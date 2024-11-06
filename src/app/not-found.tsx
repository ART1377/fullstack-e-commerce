import Link from "next/link";
import Image from "next/image";
import Button from "./components/button/button";
import HomeIcon from "./icons/home-icon";
import React from "react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex-center flex-col gap-5 my-10">
      <div className="relative w-full max-w-[500px] aspect-video">
        <Image src={"/images/error-image.png"} alt={"error-image"} fill />
      </div>
      <p>صفحه ی موردنطر یافت نشد</p>

      <div className="flex gap-3">
        <Button icon={<HomeIcon styles="size-6" />}>
          <Link href={"/"} aria-label="homepage">
            بازگشت به خانه
          </Link>
        </Button>
      </div>
    </div>
  );
}
