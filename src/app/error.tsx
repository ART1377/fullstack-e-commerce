"use client";

import Image from "next/image";
import Button from "./components/button/button";
import RefreshIcon from "./icons/refresh-icon";
import Link from "next/link";
import HomeIcon from "./icons/home-icon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-full flex-center flex-col gap-5 my-10">
      <div className="relative w-full max-w-[500px] aspect-video">
        <Image src={"/images/error-image.png"} alt={"error-image"} fill />
      </div>
      <div className="flex gap-3">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          icon={<RefreshIcon styles="size-6" />}
        >
          تلاش مجدد
        </Button>
        <Button outline icon={<HomeIcon styles="size-6" />}>
          <Link href={"/"}>بازگشت به خانه</Link>
        </Button>
      </div>
    </div>
  );
}
