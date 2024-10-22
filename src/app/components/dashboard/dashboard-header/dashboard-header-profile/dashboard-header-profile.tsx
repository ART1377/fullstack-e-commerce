"use client";

import React from "react";
import Spinner from "@/app/components/spinner/spinner";
import Image from "next/image";
import { useCurrentSession } from "@/app/hooks/useCurrentSession";

type Props = {};

const DashboardHeaderProfile = (props: Props) => {
  const { session, status } = useCurrentSession();

  const user: any = session && session.user ? session.user : undefined;

  return (
    <>
      {status === "loading" ? (
        <div className="relative overflow-hidden flex-center bg-customGray-100 rounded-full size-10">
          <Spinner size={20} />
        </div>
      ) : (
        <div className="relative overflow-hidden flex-center bg-customGray-100 rounded-full size-10 hover:bg-customGray-200 custom-transition">
          {user.image ? (
            <Image
              alt={user.firstName}
              src={user.image}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="text-bodySmall text-dark">{`${user.firstName.charAt(
              0
            )}.${user.lastName.charAt(0)}`}</div>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardHeaderProfile;
