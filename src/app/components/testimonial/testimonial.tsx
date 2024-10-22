import React from "react";
import { Comment } from "../../../../next-type-d";
import Rating from "../rating/rating";
import Image from "next/image";
import LikeIcon from "@/app/icons/like-icon";
import DislikeIcon from "@/app/icons/dislike-icon";


type Props = {
  comment: Comment;
};

const Testimonial = ({comment}: Props) => {
  return (
    <div className="rounded-xl shadow bg-white flex flex-col justify-center pt-2 pb-7 custom-transition hover:shadow-none">
      {/* rating */}
      <div className="w-full flex-center gap-3">
        <div className="bg-customGray-200 h-px min-w-14 w-[calc(40%-100px)]"></div>
        <div>
          <Rating rating={comment.rating} />
        </div>
        <div className="bg-customGray-200 h-px min-w-14 w-[calc(40%-100px)]"></div>
      </div>
      {/* image and comment content */}
      <div className="flex flex-col items-center gap-y-8 mt-8 sm:flex-row sm:gap-x-10">
        {/* images */}
        <div className="relative shadow w-28 h-36 sm:mr-10">
          <Image
            alt={comment.creator.name}
            src={comment.creator.image}
            fill
            style={{
              objectFit: "cover",
              borderRadius: "12px",
              zIndex: "1",
            }}
          />
          <div className="absolute -top-4 -right-4">
            <Image
              alt={"dots"}
              src={"/images/dots.png"}
              width={54}
              height={104}
            />
          </div>
          <div className="absolute -bottom-10 left-1.5 rotate-90">
            <Image
              alt={"dots"}
              src={"/images/dots.png"}
              width={54}
              height={104}
            />
          </div>
        </div>
        {/* comment content */}
        <div className="w-full bg-light p-4 sm:rounded-r-xl sm:w-[calc(100%-200px)] sm:mr-auto">
          <p className="text-dark text-bodyMain">{comment.title}</p>
          <small className="mt-2 mb-3 text-bodySmall text-customGray-500">
            {comment.description}
          </small>
          <div className="flex justify-between items-end mt-3">
            {/* creator name - date */}
            <div className="flex flex-col gap-1">
              <small className="text-bodySmall text-customGray-700">
                {comment.creator.name}
              </small>
              <small className="text-captionMain text-customGray-500">
                {comment.date}
              </small>
            </div>
            {/* like - dislike */}
            <div className="flex gap-2 text-bodySmall text-customGray-500">
              <div className="flex items-end gap-0.5">
                <div className="like-dislike cursor-pointer custom-transition hover:text-dark">
                  <LikeIcon styles="size-6" />
                </div>
                {comment.numberOfLikes}
              </div>
              <div className="flex items-end gap-0.5">
                <div className="like-dislike cursor-pointer custom-transition hover:text-dark">
                  <DislikeIcon styles="size-6" />
                </div>
                {comment.numberOfDislikes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
