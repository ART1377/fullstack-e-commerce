import React from 'react'
import SocialMediaItem from '../../social-media-item/social-media-item';
import { socialMediaItems } from '../../footer/footer';
import { SocialItemType } from '../../../../../next-type-models';

type Props = {}

const ContactUsSocialMedia = (props: Props) => {
  return (
    <div className="bg-primary-main flex-center gap-3 rounded-2xl py-1 px-2 w-fit">
      {socialMediaItems.map((media: SocialItemType) => {
        return <SocialMediaItem key={media.title} media={media} />;
      })}
    </div>
  );
}

export default ContactUsSocialMedia