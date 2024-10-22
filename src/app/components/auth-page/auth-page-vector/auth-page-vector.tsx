import React from "react";
import Image from "next/image";

type Props = {};

const AuthPageVector = (props: Props) => {
  return (
    <div className="relative w-full aspect-square">
      <Image
        alt="login-vector"
        src={"/images/auth-vector.png"}
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default AuthPageVector;
