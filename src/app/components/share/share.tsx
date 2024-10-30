import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
type Props = {};

const Share = (props: Props) => {
  const shareUrl = window.location.href;
  return (
    <div className="p-3 grid grid-cols-1 gap-3">
      <div className="border border-customGray-300 p-2 text-dark rounded-xl shadow custom-transition hover:bg-customGray-200 cursor-pointer">
        <EmailShareButton
          url={shareUrl}
          className="flex items-center justify-between w-full"
        >
          <p className="text-dark text-bodyMain">ایمیل</p>
          <EmailIcon size={36} round />
        </EmailShareButton>
      </div>
      <div className="border border-customGray-300 p-2 text-dark rounded-xl shadow custom-transition hover:bg-customGray-200 cursor-pointer">
        <LinkedinShareButton
          url={shareUrl}
          className="flex items-center justify-between w-full"
        >
          <p className="text-dark text-bodyMain">لینکدین</p>
          <LinkedinIcon size={36} round />
        </LinkedinShareButton>
      </div>
      <div className="border border-customGray-300 p-2 text-dark rounded-xl shadow custom-transition hover:bg-customGray-200 cursor-pointer">
        <FacebookShareButton
          url={shareUrl}
          className="flex items-center justify-between w-full"
        >
          <p className="text-dark text-bodyMain">فیسبوک</p>
          <FacebookIcon size={36} round />
        </FacebookShareButton>
      </div>
      <div className="border border-customGray-300 p-2 text-dark rounded-xl shadow custom-transition hover:bg-customGray-200 cursor-pointer">
        <TelegramShareButton
          url={shareUrl}
          className="flex items-center justify-between w-full"
        >
          <p className="text-dark text-bodyMain">تلگرام</p>
          <TelegramIcon size={36} round />
        </TelegramShareButton>
      </div>
      <div className="border border-customGray-300 p-2 text-dark rounded-xl shadow custom-transition hover:bg-customGray-200 cursor-pointer">
        <WhatsappShareButton
          url={shareUrl}
          className="flex items-center justify-between w-full"
        >
          <p className="text-dark text-bodyMain">واتساپ</p>
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>
      </div>
      <div className="border border-customGray-300 p-2 text-dark rounded-xl shadow custom-transition hover:bg-customGray-200 cursor-pointer">
        <TwitterShareButton
          url={shareUrl}
          className="flex items-center justify-between w-full"
        >
          <p className="text-dark text-bodyMain">توییتر</p>
          <TwitterIcon size={36} round />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default Share;
