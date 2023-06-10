"use client";
import TatilBg from "@/assets/svg/cityBg.svg";
import gsap from "gsap";
import { useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
export const CalculatorsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    gsap.to("#cityBg_svg__cloud1", {
      duration: 30,
      x: "+=100",
      yoyo: true,
      repeat: -1,
      ease: "linear",
    });

    gsap.to("#cityBg_svg__cloud2", {
      duration: 30,
      x: "+=100",
      yoyo: true,
      repeat: -1,
      ease: "linear",
    });
    gsap.to("#cityBg_svg__cloud3", {
      duration: 30,
      x: "-=100",
      yoyo: true,
      repeat: -1,
      ease: "linear",
    });
    gsap.to("#cityBg_svg__cloud4", {
      duration: 30,
      x: "-=100",
      yoyo: true,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-x-hidden">
      <style>
        {`
        svg {
          overflow: visible;
        }
        `}
      </style>
      <Navbar />
      <main className="flex flex-col items-center pt-[109px] flex-1 px-5 lg:px-20 text-center">
        {children}
      </main>
      <div className="absolute h-[40vh] lg:h-[50vh] xl:h-[70vh] min-w-[768px] mx-auto md:w-full bottom-0 left-0 select-none -z-10 transition-all">
        {/* <Image
          src={tatilBg}
          alt="tatil-bg"
          fill
          className="object-fill object-center overflow-x-hidden"
        /> */}
        {/* <object
          id="tatil-bg"
          type="image/svg+xml"
          data={TatilBg.src}
          className="object-fill object-bottom h-full"
        /> */}
        <TatilBg id="tatil-bg" className="object-bottom h-full" />
      </div>
    </div>
  );
};
