import React from "react";
import SocialMediaItem from "../../social-media-item/social-media-item";
import { SocialItemType } from "../../../../../next-type-models";

type Props = {
  socialMediaItems: SocialItemType[];
};

const FooterSocialMedia = ({ socialMediaItems }: Props) => {
  return (
    <div className="bg-primary-main flex-center gap-5 rounded-b-2xl py-3 px-4 w-fit mx-auto">
      {socialMediaItems.map((media: SocialItemType) => {
        return <SocialMediaItem key={media.title} media={media} />;
      })}
    </div>
  );
};

export default FooterSocialMedia;
