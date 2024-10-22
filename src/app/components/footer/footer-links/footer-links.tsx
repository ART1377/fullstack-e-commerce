import React from "react";
import Link from "next/link";
import { FooterItemType, FooterItemLinkType } from "../../../../../next-type-d";

type Props = {
  footerItems: FooterItemType[];
};

const FooterLinks = ({ footerItems }: Props) => (
  <div className="flex flex-col gap-10 sm:flex-row blgxl:gap-16">
    {footerItems.map((footerItem) => (
      <div
        key={footerItem.header}
        className="flex items-center flex-col text-center bmlg:text-right bmlg:items-start"
      >
        <p className="text-h6 text-primary-main">{footerItem.header}</p>
        <ul className="mt-2">
          {footerItem.links.map((footerLink: FooterItemLinkType) => {
            const isTel = footerLink.path.includes("tel:");
            const isMailto = footerLink.path.includes("mailto:");
            return (
              <li
                key={footerLink.title}
                className="text-dark text-bodyMain custom-transition hover:text-primary-main mt-1"
              >
                {isTel || isMailto ? (
                  <a href={footerLink.path}>{footerLink.title}</a>
                ) : (
                  <Link href={footerLink.path}>{footerLink.title}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </div>
);

export default FooterLinks;
