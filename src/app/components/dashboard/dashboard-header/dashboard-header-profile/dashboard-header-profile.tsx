"use client";

import React from "react";
import Spinner from "@/app/components/spinner/spinner";
import Image from "next/image";
import { useSessionContext } from "@/app/context/useSessionContext";
import Link from "next/link";
import PersonIcon from "@/app/icons/person-icon";

type Props = {};

const DashboardHeaderProfile = (props: Props) => {
  const { session, status } = useSessionContext();

  const user: any = session && session.user ? session.user : undefined;

  return (
    <>
      {status === "loading" ? (
        <div className="relative overflow-hidden flex-center bg-customGray-100 rounded-full size-10">
          <Spinner size={20} />
        </div>
      ) : (
        <>
          {user ? (
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
          ) : (
            <Link
              href={"/auth/login"}
              className="relative overflow-hidden flex-center bg-customGray-100 rounded-full size-10 cursor-pointer hover:bg-customGray-200 custom-transition"
            >
              <PersonIcon styles="size-6" />
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default DashboardHeaderProfile;
