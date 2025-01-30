import React, { FC } from "react";
import MainTitleProps from "./index.types"
import Image from "next/image";

const MainTitle: FC<MainTitleProps> = ({ }) => {
    return (
        <div className="relative w-full h-[300px] mb-4">
            <Image
                src="/images/home_image.jpg"
                alt="Background image GPX plotter"
                layout="fill"
                objectFit="cover"
                priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-8xl text-gray-800">GPX PLOTTER</h1>
            </div>
        </div>
  );
};

export default MainTitle;