import React from 'react'

type Props = {
    title:string;
    items:number;
}

const MetricCard = ({items,title}: Props) => {
  return (
    <div className="px-3 py-16 text-primary-main border border-primary-main rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
      <p className="text-bodyMain">{title}</p>
      <small className="text-h6">{items}</small>
      <div className="absolute bottom-0 w-full h-4 bg-primary-main"></div>
    </div>
  );
}

export default MetricCard