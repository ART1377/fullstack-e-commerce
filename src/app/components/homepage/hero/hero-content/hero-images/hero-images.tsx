// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Product } from "../../../../../../../next-type-models";

// type Props = {
//   products: Product[];
//   current: number;
//   changeSlide: (index: number) => void;
// };

// const HeroImages = ({ products, current, changeSlide }: Props) => {


//   const getSlideInVariant = (index: number) => {
//     switch (index) {
//       case 0:
//         return {
//           hidden: { x: -200, y: -200, opacity: 0, scale: 0.6 }, // Top-left
//           visible: { x: [-200, 20, 0], y: 0, opacity: 1, scale: [0.6, 1.2, 1] },
//           exit: { x: 200, y: -200, opacity: 0 }, // Move out to the right
//         };
//       case 1:
//         return {
//           hidden: { x: -200, y: 0, opacity: 0, scale: 0.6 }, // Center-left
//           visible: { x: [-200, 20, 0], y: 0, opacity: 1, scale: [0.6, 1.2, 1] },
//           exit: { x: 200, y: 0, opacity: 0 }, // Move out to the right
//         };
//       case 2:
//         return {
//           hidden: { x: -200, y: 200, opacity: 0, scale: 0.6 }, // Bottom-left
//           visible: { x: [-200, 20, 0], y: 0, opacity: 1, scale: [0.6, 1.2, 1] },
//           exit: { x: 200, y: 200, opacity: 0 }, // Move out to the right
//         };
//       default:
//         return {
//           hidden: { x: -200, opacity: 0, scale: 0.6 },
//           visible: { x: [-200, 20, 0], opacity: 1, scale: [0.6, 1.2, 1] },
//           exit: { x: 200, opacity: 0 },
//         };
//     }
//   };

//   return (
//     <div className="flex justify-between w-[95%] mx-auto sm:max-w-[500px] md:w-6/12 md:mr-0 md:max-w-none">
//       <Link
//         href={`products/${products[current].id}`}
//         className="w-1/2 aspect-square relative bg-primary-light rounded-full h-fit my-auto"
//       >
//         <motion.div
//           key={products[current].id}
//           variants={getSlideInVariant(current)} // Dynamically set animation based on the index
//           initial="hidden" // Initial state (off-screen left)
//           animate="visible" // Animate to visible state
//           exit="exit" // When exiting, animate out to the right
//           transition={{ duration: 1 }} // Control the duration of the animation
//           className="w-full h-full relative"
//         >
//           <Image
//             alt={products[current].title}
//             src={products?.[current]?.images?.[0]?.url!}
//             fill
//             style={{
//               objectFit: "cover",
//               scale: "1.2",
//             }}
//           />
//         </motion.div>
//       </Link>
//       <div className="flex flex-col w-1/2 relative">
//         {products.map((product, index) => (
//           <div
//             key={product.id}
//             onClick={() => changeSlide(index)}
//             className={`${
//               current === index ? "bg-primary-main" : "bg-primary-light"
//             } aspect-square cursor-pointer rounded-2xl custom-transition hover:opacity-60 w-6/12 absolute 
//                ${
//                  index === 0
//                    ? "-top-[30%] md:top-[5%] bmlg:top-0 blgxl:-top-[12%]"
//                    : index === 1
//                    ? "absolute-vertically-center right-[30%]"
//                    : index === 2
//                    ? "-bottom-[30%] md:bottom-[5%] bmlg:bottom-0 blgxl:-bottom-[12%]"
//                    : ""
//                }
//             `}
//           >
//             <Image
//               alt={product.title}
//               src={product?.images?.[0]?.url!}
//               fill
//               style={{
//                 objectFit: "cover",
//                 scale: "1.2",
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroImages;



import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "../../../../../../../next-type-models";

type Props = {
  products: Product[];
  current: number;
  changeSlide: (index: number) => void;
};

const HeroImages = ({ products, current, changeSlide }: Props) => {
  const getSlideInVariant = (index: number) => {
    switch (index) {
      case 0:
        return {
          hidden: { x: -200, y: -200, opacity: 0, scale: 0.6 }, // Top-left
          visible: { x: [-200, 20, 0], y: 0, opacity: 1, scale: [0.6, 1.2, 1] },
          exit: { x: 200, y: -200, opacity: 0 }, // Move out to the right
        };
      case 1:
        return {
          hidden: { x: -200, y: 0, opacity: 0, scale: 0.6 }, // Center-left
          visible: { x: [-200, 20, 0], y: 0, opacity: 1, scale: [0.6, 1.2, 1] },
          exit: { x: 200, y: 0, opacity: 0 }, // Move out to the right
        };
      case 2:
        return {
          hidden: { x: -200, y: 200, opacity: 0, scale: 0.6 }, // Bottom-left
          visible: { x: [-200, 20, 0], y: 0, opacity: 1, scale: [0.6, 1.2, 1] },
          exit: { x: 200, y: 200, opacity: 0 }, // Move out to the right
        };
      default:
        return {
          hidden: { x: -200, opacity: 0, scale: 0.6 },
          visible: { x: [-200, 20, 0], opacity: 1, scale: [0.6, 1.2, 1] },
          exit: { x: 200, opacity: 0 },
        };
    }
  };

  return (
    <div className="flex justify-between w-[95%] mx-auto sm:max-w-[500px] md:w-6/12 md:mr-0 md:max-w-none">
      <Link
        href={`products/${products[current].id}`}
        aria-label="product"
        className="w-1/2 aspect-square relative bg-primary-light rounded-full h-fit my-auto overflow-hidden border border-primary-main"
      >
        <motion.div
          key={products[current].id}
          variants={getSlideInVariant(current)} // Dynamically set animation based on the index
          initial="hidden" // Initial state (off-screen left)
          animate="visible" // Animate to visible state
          exit="exit" // When exiting, animate out to the right
          transition={{ duration: 1 }} // Control the duration of the animation
          className="w-full h-full relative"
        >
          <Image
            alt={products[current].title}
            src={products?.[current]?.images?.[0]?.url!}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
      </Link>
      <div className="flex flex-col w-1/2 relative">
        {products.map((product, index) => (
          <div
            key={product.id}
            onMouseEnter={() => changeSlide(index)}
            className={`${
              current === index ? "bg-primary-main" : "bg-primary-light"
            } overflow-hidden border border-primary-main aspect-square cursor-pointer rounded-2xl custom-transition hover:opacity-60 w-6/12 absolute 
               ${
                 index === 0
                   ? "-top-[30%] md:top-[5%] bmlg:top-0 blgxl:-top-[12%]"
                   : index === 1
                   ? "absolute-vertically-center right-[30%]"
                   : index === 2
                   ? "-bottom-[30%] md:bottom-[5%] bmlg:bottom-0 blgxl:-bottom-[12%]"
                   : ""
               }
            `}
          >
            <Image
              alt={product.title}
              src={product?.images?.[0]?.url!}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroImages;
