import React from 'react'
import { SocialItemType } from '../../../../../next-type-d';
import SocialMediaItem from '../../social-media-item/social-media-item';
import { socialMediaItems } from '../../footer/footer';

type Props = {}

const ContactUsSocialMedia = (props: Props) => {
  return (
    <div className="bg-primary-main flex-center gap-5 rounded-2xl py-2 px-3 w-fit">
      {socialMediaItems.map((media: SocialItemType) => {
        return <SocialMediaItem key={media.title} media={media} />;
      })}
    </div>
  );
}

export default ContactUsSocialMedia