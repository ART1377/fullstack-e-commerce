import React from 'react'
import Image from "next/image";

type Props = {}

const ContactUsVector = (props: Props) => {
  return (
    <div className="relative min-w-[200px] aspect-square w-[80%] max-w-[300px]">
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