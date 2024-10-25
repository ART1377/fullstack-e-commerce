import Footer from '@/app/components/footer/footer';
import Header from '@/app/components/header/header';
import React from 'react'

type Props = {
  children: React.ReactNode;
};

const UserLayout = ({children}: Props) => {
  return (
    <>
      <Header />
      <main className="custom-container min-h-[calc(100vh-500px)]">{children}</main>
      <Footer />
    </>
  );
}

export default UserLayout