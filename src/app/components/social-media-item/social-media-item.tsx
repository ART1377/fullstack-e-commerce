import React from "react";
import Link from "next/link";
import { SocialItemType } from "../../../../next-type-d";

type Props = {
  media: SocialItemType;
};

const SocialMediaItem = ({ media }: Props) => {
  return (
    <Link
      className="size-10 flex-center rounded-full text-white custom-transition hover:bg-white hover:text-primary-main"
      href={media.path}
      target="_blank"
    >
      {media.icon}
    </Link>
  );
};

export default SocialMediaItem;
