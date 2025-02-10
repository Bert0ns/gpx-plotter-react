import React, { FC } from "react";
import Image from "next/image";

const MainTitle: FC = () => {
    return (
        <div className="relative w-full h-[300px] mb-4">
            <Image
                src="/images/home_image.jpg"
                alt="Background image GPX plotter"
                className="absolute inset-0 w-full h-full object-cover"
                height={1280}
                width={1920}
                priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-8xl text-gray-800">GPX PLOTTER</h1>
            </div>
        </div>
  );
};

export default MainTitle;