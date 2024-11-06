import React from "react";
import Link from "next/link";
import { SocialItemType } from "../../../../next-type-models";

type Props = {
  media: SocialItemType;
};

const SocialMediaItem = ({ media }: Props) => {
  return (
    <Link
      href={media.path}
      aria-label={media.title}
      target="_blank"
      className="size-10 flex-center rounded-full text-white custom-transition hover:bg-white hover:text-primary-main"
    >
      {media.icon}
    </Link>
  );
};

export default SocialMediaItem;
