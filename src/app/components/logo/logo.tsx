import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  white?: boolean;
  styles?: string;
};

const Logo = ({ styles, white }: Props) => {
  return (
    <>
      <Link href="/" className={`${styles} custom-transition hover:opacity-60`}>
        <Image
          alt="هامتو سیتی"
          src={white ? "/images/logo-white.png" : "/images/logo.png"}
          width={116}
          height={33}
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </Link>
    </>
  );
};

export default Logo;
