import React from "react";
import { SocialItemType } from "../../../../../next-type-d";
import SocialMediaItem from "../../social-media-item/social-media-item";

type Props = {
  socialMediaItems: SocialItemType[];
};

const FooterSocialMedia = ({ socialMediaItems }: Props) => {
  return (
    <div className="bg-primary-main flex-center gap-5 rounded-b-2xl py-3 px-4 w-fit mx-auto">
      {socialMediaItems.map((media: SocialItemType) => {
        return <SocialMediaItem media={media} />;
      })}
    </div>
  );
};

export default FooterSocialMedia;
