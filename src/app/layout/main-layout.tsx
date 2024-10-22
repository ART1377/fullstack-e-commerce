"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </Provider>
    </SessionProvider>
  );
};

export default MainLayout;
