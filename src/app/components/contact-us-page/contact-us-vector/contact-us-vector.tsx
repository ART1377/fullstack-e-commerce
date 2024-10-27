import React from 'react'
import Image from "next/image";

type Props = {}

const ContactUsVector = (props: Props) => {
  return (
    <div className="relative min-w-[180px] aspect-square w-[75%] max-w-[280px] max-h-[220px] ">
      <Image
        alt="contact-us"
        src={"/images/contact-us.png"}
        fill
        style={{
          objectFit: "fill",
        }}
      />
    </div>
  );
}

export default ContactUsVector