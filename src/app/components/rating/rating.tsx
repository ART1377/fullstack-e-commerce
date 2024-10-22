"use client";

import StarEmptyIcon from "@/app/icons/star-empty-icon";
import StarFillIcon from "@/app/icons/star-fill-icon";
import StarHalfIcon from "@/app/icons/star-half-icon";
import React from "react";

type Props = {
  rating: number; // Rating can be a float
};

const Rating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating); // Number of fully filled stars
  const hasHalfStar = rating % 1 > 0; // Check if there's a half-star
  const totalStars = 5; // Total number of stars

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return (
            <StarFillIcon key={index} styles="size-6 text-primary-light" />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <StarHalfIcon key={index} styles="size-6 text-primary-light" />
          );
        } else {
          return (
            <StarEmptyIcon key={index} styles="size-6 text-primary-light" />
          );
        }
      })}
    </div>
  );
};

export default Rating;
