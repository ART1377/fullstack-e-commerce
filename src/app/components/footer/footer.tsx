import React from "react";
import Logo from "../logo/logo";
import InstagramIcon from "@/app/icons/instagram-icon";
import TelegramIcon from "@/app/icons/telegram-icon";
import Whatsapp from "@/app/icons/whatsapp-icon";
import FooterCopyright from "./footer-copyright/footer-copyright";
import FooterLinks from "./footer-links/footer-links";
import FooterLocation from "./footer-location/footer-location";
import FooterSocialMedia from "./footer-social-media/footer-social-media";
import { FooterItemType, SocialItemType } from "../../../../next-type-models";

type Props = {};

const footerItems: FooterItemType[] = [
  {
    header: "دسته بندی محصولات",
    links: [
      { title: "کفش", path: "/products?page=1&selectedCategory=کفش" },
      {
        title: "کوله پشتی",
        path: "/products?page=1&selectedCategory=کوله پشتی",
      },
      { title: "چادر", path: "/products?page=1&selectedCategory=چادر" },
      { title: "پوشاک", path: "/products?page=1&selectedCategory=پوشاک" },
    ],
  },
  {
    header: "آشنایی با ما",
    links: [
      { title: "تماس با ما", path: "/contact-us" },
      { title: "قوانین و مقررات", path: "/" },
      { title: "ارتباط با ما", path: "/contact-us" },
    ],
  },
  {
    header: "تماس با ما",
    links: [
      {
        title: process.env.PHONE_NUMBER?.toString()!,
        path: `tel:${process.env.PHONE_NUMBER}`,
      },
      {
        title: process.env.EMAIL_ADDRESS?.toString()!,
        path: `mailto:${process.env.EMAIL_ADDRESS}`,
      },
    ],
  },
];

export const socialMediaItems: SocialItemType[] = [
  {
    title: "instagram",
    path: process.env.TELEGRAM_LINK!,
    icon: <InstagramIcon styles="size-8" />,
  },
  {
    title: "whatsapp",
    path: process.env.WHATSAPP_LINK!,
    icon: <Whatsapp styles="size-8" />,
  },
  {
    title: "telegram",
    path: process.env.TELEGRAM_LINK!,
    icon: <TelegramIcon styles="size-8" />,
  },
];

const Footer = (props: Props) => {
  return (
    <footer className="mt-20 md:mt-28 rounded-t-3xl overflow-hidden">
      {/* logo */}
      <div className="bg-primary-main w-full min-h-14 flex-center">
        <Logo white styles="sm:scale-125" />
      </div>
      {/* social media */}
      <FooterSocialMedia socialMediaItems={socialMediaItems} />

      {/* center part */}
      <div className="custom-container flex flex-col items-center gap-5 px-2 pt-12 pb-5 sm:gap-10 sm:pb-8 bmlg:flex-row-reverse bmlg:justify-around">
        {/* location */}
        <FooterLocation />
        {/* links */}
        <FooterLinks footerItems={footerItems} />
      </div>
      {/* copy right */}
      <FooterCopyright />
    </footer>
  );
};

export default Footer;
