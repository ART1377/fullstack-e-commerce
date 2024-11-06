import Link from "next/link";
import React from "react";
import Button from "../button/button";

type Props = {
  children: React.ReactNode;
  link?: string;
};

const Title = ({ children, link }: Props) => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex-center gap-2">
        <div className="flex items-center gap-0.5 xs:gap-1 min-w-[20%] xs:min-w-[30%] lg:w-[35%]">
          <div className="h-px bg-primary-light rounded-full min-w-10 w-[calc(100%-40px)]"></div>
          <div className="custom-shape bg-primary-light size-3"></div>
          <div className="custom-shape bg-primary-main size-4"></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-bodyMainBold text-center text-primary-main lg:text-h6">
            {children}
          </div>
        </div>
        <div className="flex items-center gap-0.5 xs:gap-1 min-w-[20%] xs:min-w-[30%] lg:w-[35%]">
          <div className="custom-shape bg-primary-main size-4"></div>
          <div className="custom-shape bg-primary-light size-3"></div>
          <div className="h-px bg-primary-light rounded-full min-w-10 w-[calc(100%-40px)]"></div>
        </div>
      </div>
      {link && (
        <Link href={link} aria-label="title" className="mx-auto mt-2">
          <Button color="primary-light">مشاهده همه</Button>
        </Link>
      )}
    </div>
  );
};

export default Title;
