"use client";

// import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import {SessionProvider} from "@/app/context/useSessionContext";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="extra-classes hover:bg-dark hidden"></div>
    </SessionProvider>
  );
};

export default MainLayout;
