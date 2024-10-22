import CallIcon from '@/app/icons/call-icon';
import EmailIcon from '@/app/icons/email-icon';
import LocationIcon from '@/app/icons/location-icon';
import React from 'react'

type Props = {}

const ContactUsInformation = (props: Props) => {
  return (
    <div className="flex flex-col gap-3" suppressHydrationWarning>
      {/* phone number */}
      <div className="flex items-center gap-3">
        <div className="size-9 border border-primary-main rounded-full flex-center text-primary-main">
          <CallIcon styles="size-6" />
        </div>
        <a
          href={`tel:${process.env.PHONE_NUMBER}`}
          className="text-dark text-bodySmall custom-transition hover:text-primary-main cursor-pointer"
        >
          {process.env.PHONE_NUMBER}
        </a>
      </div>
      {/* location */}
      <div className="flex items-center gap-3">
        <div className="size-9 border border-primary-main rounded-full flex-center text-primary-main">
          <LocationIcon styles="size-6" />
        </div>
        <small className="text-dark text-bodySmall">
          {process.env.LOCATION_ADDRESS}
        </small>
      </div>
      {/* email */}
      <div className="flex items-center gap-3">
        <div className="size-9 border border-primary-main rounded-full flex-center text-primary-main">
          <EmailIcon styles="size-6" />
        </div>
        <a
          href={`mailto:${process.env.EMAIL_ADDRESS}`}
          className="text-dark text-bodySmall custom-transition hover:text-primary-main cursor-pointer"
        >
          {process.env.EMAIL_ADDRESS}
        </a>
      </div>
    </div>
  );
}

export default ContactUsInformation