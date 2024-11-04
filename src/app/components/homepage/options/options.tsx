import React from "react";
import Image from "next/image";
import SupportIcon from "@/app/icons/support-icon";
import PaymentIcon from "@/app/icons/payment-icon";
import QualityIcon from "@/app/icons/quality-icon";
import OptionItem from "./option-item/option-item";
import SevenIcon from "@/app/icons/seven-icon";
import Title from "../../title/title";
import { OptionItemType } from "../../../../../next-type-models";

type Props = {};

const Options = (props: Props) => {
  const options: OptionItemType[] = [
    {
      id: '1',
      title: "فرصت 7 روزه بازگشت کالا",
      description: "ضمانت بازگشت کالا تا 7 روز",
      icon: <SupportIcon styles="size-12 text-primary-main" />,
    },
    {
      id: '2',
      title: "پشتیبانی و مشاوره",
      description: "پشتیبانی همه روزه",
      icon: <SevenIcon styles="size-12 text-primary-main" />,
    },
    {
      id: '3',
      title: "تضمین کیفیت کالا",
      description: "ضمامنت اورجینال بودن کالا ",
      icon: <QualityIcon styles="size-12 text-primary-main" />,
    },
    {
      id: '4',
      title: "پرداخت امن از درگاه بانکی",
      description: "امنیت در خریدهای آنلاین",
      icon: <PaymentIcon styles="size-12 text-primary-main" />,
    },
  ];

  return (
    <section className="mt-20 md:mt-28 w-full">
      <Title>
        <h5>چرا هامتوسیتی ؟</h5>
      </Title>
      <div className="w-full min-h-72 relative mt-5">
        <Image
          alt="options-bg"
          src="/images/options-bg.png"
          fill
          style={{
            zIndex: "-1",
          }}
        />
        <div className="py-12 px-2 sm:px-5 grid gap-7 md:grid-cols-2">
          {options.map((option: OptionItemType, index: number) => {
            return <OptionItem key={option.id} index={index} option={option} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Options;
