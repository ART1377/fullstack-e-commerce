import React from "react";

type Props = {};

const FooterLocation = (props: Props) => {
  return (
    <div className="size-[250px] rounded-2xl relative border-[3px] border-primary-main shadow-lg">
      <iframe
      title="location iframe in footer"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3241.9229401005477!2d51.49626552495835!3d35.65427017259604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDM5JzE1LjQiTiA1McKwMjknMzcuMyJF!5e0!3m2!1sfa!2s!4v1725737028103!5m2!1sfa!2s"
        width="100%"
        height="100%"
        style={{
          borderRadius: "16px",
        }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default FooterLocation;
