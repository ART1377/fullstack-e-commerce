import React, { Suspense } from "react";
import ProfilePageFavorites from "./favorites/favorites";
import ProfilePageUserCard from "./user-card/user-card";
import ProfilePageOrders from "./profile-page-orders/profile-page-orders";
import { auth } from "@/app/auth";
import * as actions from "@/app/actions/user-actions/user-actions";
import Spinner from "../spinner/spinner";
import Breadcrumb from "../breadcrumb/breadcrumb";


export const revalidate = 60 * 10;


type Props = {};

const ProfilePage = async (props: Props) => {
  const session = await auth();

  const { user } = await actions.getUserProfileInformation(session?.user?.id!);

  // await db.order.deleteMany()  

  return (
    <>
      <Breadcrumb />
      <section className="w-full mt-4 sm:mt-6 flex flex-col md:flex-row gap-3">
        {session && session?.user && user ? (
          <>
            {/* user card */}
            <ProfilePageUserCard user={user} />
            {/* user info */}
            <div className="w-full flex flex-col gap-3 shadow bg-white rounded-xl p-3 pb-8 md:w-[calc(100%-292px)]">
              {/* orders */}
              <Suspense fallback={<Spinner size={50} />}>
                <ProfilePageOrders />
              </Suspense>
              {/* favorites */}
              <Suspense fallback={<Spinner size={50} />}>
                <ProfilePageFavorites />
              </Suspense>
            </div>
          </>
        ) : (
          <div className="w-full text-bodyMain text-state-error px-3 py-5 flex-center text-center bg-state-error-200 rounded-xl">
            <small>کاربری یافت نشد</small>
          </div>
        )}
      </section>
    </>
  );
};

export default ProfilePage;
