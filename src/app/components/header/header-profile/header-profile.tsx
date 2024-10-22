"use client";

import PersonIcon from "@/app/icons/person-icon";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Spinner from "../../spinner/spinner";
import ArrowBottomIcon from "@/app/icons/arrow-bottom-icon";
import { motion, AnimatePresence } from "framer-motion";
import LogoutIcon from "@/app/icons/logout-icon";
import { useCurrentSession } from "@/app/hooks/useCurrentSession";
import DashboardIcon from "@/app/icons/dashboard-icon";
import * as actions from '@/app/actions/auth-actions'
import { useFormState } from "react-dom";


// dropdown animation
const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

type Props = {};

const HeaderProfile = (props: Props) => {


  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { session, status } = useCurrentSession();

  const user: any = session && session?.user ? session.user : undefined;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom signOut and refresh page
  const handleSignOut = async () => {
    await actions.handleSighOut();
    window.location.reload()
  };

  return (
    <>
      {status === "loading" ? (
        <div className="relative overflow-hidden flex-center bg-customGray-100 rounded-full size-10">
          <Spinner size={20} />
        </div>
      ) : (
        <>
          {user ? (
            <div
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="relative flex cursor-pointer"
              ref={dropdownRef}
            >
              <ArrowBottomIcon styles="size-6 mt-auto" />
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
              {/* Dropdown menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                    className="absolute top-12 left-0 bg-white shadow-lg rounded-xl z-20 p-3 w-[240px] flex flex-col gap-3 cursor-default"
                  >
                    {/* user information */}
                    <div className="flex gap-2">
                      <div className="size-12 rounded-full shadow relative overflow-hidden flex-center bg-customGray-100">
                        {user?.image ? (
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
                      <div className="flex flex-col justify-between max-w-[calc(100%-60px)]">
                        <small className="text-customGray-700 text-bodySmall">
                          {user?.firstName} {user?.lastName}
                        </small>
                        <span className="text-captionMain text-customGray-500 line-clamp-1">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                    {/* profile / dark mode and ... */}
                    <ul className="flex flex-col gap-1 min-w-max border-t border-b border-customGray-300 py-2">
                      <li
                        className={`p-2 text-dark rounded-lg custom-transition hover:bg-primary-200 hover:text-primary-main cursor-pointer text-bodyMain`}
                      >
                        <Link
                          href={"/profile"}
                          className="flex items-center gap-1"
                        >
                          <div className="size-6">
                            <PersonIcon />
                          </div>
                          پروفایل
                        </Link>
                      </li>
                      <li
                        className={`p-2 text-dark rounded-lg custom-transition hover:bg-primary-200 hover:text-primary-main cursor-pointer text-bodyMain`}
                      >
                        <Link
                          href={"/dashboard"}
                          className="flex items-center gap-1"
                        >
                          <div className="size-6">
                            <DashboardIcon />
                          </div>
                          داشبورد
                        </Link>
                      </li>
                    </ul>
                    {/* logout */}
                    <div
                      onClick={handleSignOut}
                      className={`flex items-center gap-1 p-2 text-state-error rounded-lg custom-transition hover:bg-state-error-200 hover:text-state-error cursor-pointer text-bodyMain`}
                    >
                      <div className="size-6">
                        <LogoutIcon />
                      </div>
                      خروج
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

export default HeaderProfile;
