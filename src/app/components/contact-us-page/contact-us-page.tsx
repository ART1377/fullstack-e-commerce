import React from "react";
import ContactUsVector from "./contact-us-vector/contact-us-vector";
import ContactUsInformation from "./contact-us-information/contact-us-information";
import ContactUsSocialMedia from "./contact-us-social-media/contact-us-social-media";
import ContactUsForm from "./contact-us-form/contact-us-form";
import Breadcrumb from "../breadcrumb/breadcrumb";

type Props = {};

const ContactUsPage = (props: Props) => {
  return (
    <>
      <Breadcrumb />
      <section className="w-full mt-4 sm:mt-6 flex flex-col gap-y-8 bg-primary-100 rounded-xl py-8 px-2 sm:px-4 sm:flex-row-reverse sm:justify-between items-center relative">
        <div className="w-full flex flex-col gap-4 items-center sm:w-[calc(50%-8px)]">
          {/* vector */}
          <ContactUsVector />
          {/* contact-us */}
          <ContactUsInformation />
          {/* social media links */}
          <ContactUsSocialMedia />
        </div>
        {/* form container */}
        <ContactUsForm />
      </section>
    </>
  );
};

export default ContactUsPage;
