"use client";

import React from "react";
import { motion } from "framer-motion";
import AuthPageVector from "../auth-page-vector/auth-page-vector";
import LoginForm from "./login-form/login-form";

type Props = {};

const LoginPage = (props: Props) => {
  const variants = {
    hidden: { opacity: 0, x: "100%" }, // Component slides in from the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }, // Visible on screen
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3 } }, // Slides out to the top
  };
  const vectorVariants = {
    hidden: { opacity: 0, x: "-100%" }, // Component slides in from the right
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, type: "spring", stiffness: 100 },
    }, // Visible on screen
  };
  const bgColorVariants = {
    hidden: { y: "-100%" }, // Component slides in from the right
    visible: {
      y: 0,
      transition: { duration: 0.5 },
    }, // Visible on screen
  };

  return (
    <section className="flex-center min-w-screen min-h-screen relative">
      <motion.div
        key="bg-color" // Unique key for animation
        variants={bgColorVariants}
        initial="hidden"
        animate="visible"
        className="absolute w-full h-[35%] top-0 bg-primary-main bmlg:h-full bmlg:w-[35%] bmlg:left-0 -z-10"
      ></motion.div>

      <div className="custom-container w-full">
        <div className="flex flex-col flex-center shadow-xl w-full px-4 gap-x-4 gap-y-8 max-w-[600px] mx-auto my-20 py-8 bmlg:py-4 bmlg:max-w-none bmlg:flex-row-reverse">
          {/* vector */}
          <motion.div
            key="vector" // Unique key for animation
            variants={vectorVariants}
            initial="hidden"
            animate="visible"
            className="w-full bmlg:w-[calc(50%-8px)]"
          >
            <AuthPageVector />
          </motion.div>
          {/* form container with animation */}
          <div className="w-full relative flex-center bmlg:w-[calc(50%-8px)]">
            <motion.div
              key="login" // Unique key for animation
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <LoginForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
