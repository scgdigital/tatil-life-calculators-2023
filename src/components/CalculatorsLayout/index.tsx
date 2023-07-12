"use client";
import TatilBg from "@/assets/svg/cityBg.svg";
import gsap, { Power1 } from "gsap";
import { useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
export const CalculatorsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useLoadTatilBackground();

  return (
    <div className="flex flex-col justify-center min-h-screen relative overflow-x-hidden">
      <style>
        {`
        svg {
          overflow: visible;
        }
        #cityBg_svg__car, #cityBg_svg__truck {
          visibility: hidden;
        }

        #cityBg_svg__suv {
          visibility:hidden;
        }
        `}
      </style>
      <Navbar />
      <main className="block pt-[56px] lg:pt-[109px] flex-1 px-5 text-center">
        <div id="portal-root" className="w-0 h-0" />
        {children}
      </main>
      <div className="absolute h-[40vh] lg:h-[50vh] xl:h-[70vh] min-w-[768px] mx-auto md:w-full bottom-0 left-1/2 -translate-x-1/2 select-none -z-10 transition-all">
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
        <TatilBg id="tatil-bg" className="object-left-bottom h-full w-full" />
      </div>
    </div>
  );
};

function useLoadTatilBackground() {
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
    //skew to simulate wind swinging
    gsap.to("#cityBg_svg__tree_1_, #cityBg_svg__tree3", {
      duration: 2,
      skewX: 2,
      y: "-=1",
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "center bottom",
    });
    gsap.to("#cityBg_svg__tree2", {
      duration: 2,
      skewX: -2,
      y: "+=1",
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "center bottom",
    });
    let carTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    carTL
      .fromTo(
        "#cityBg_svg__car",
        { x: "0", visibility: "visible" },
        {
          x: "2000",
          duration: 16,
          ease: Power1.easeIn,
          visibility: "visible",
          delay: 20,
        }
      )
      .add("car_tour");

    let suvTL = gsap.timeline({
      repeat: -1,
      repeatDelay: 4,
      delay: 22,
    });

    suvTL
      .fromTo(
        "#cityBg_svg__suv",
        {
          x: 300,
          y: 0,
          visibility: "visible",
          scaleX: 1,
        },
        {
          delay: 5,
          x: -1500,
          y: 0,
          visibility: "visible",
          duration: 15,
          scaleX: 1,
          ease: "linear",
        }
      )
      .pause();

    suvTL.fromTo(
      "#cityBg_svg__suv",
      {
        delay: 10,
        scaleX: -1,
        x: "-1000",
        y: 15,
        immediateRender: false,
      },
      {
        scaleX: -1,
        x: "1200",
        y: 15,
        duration: 15,
        ease: "linear",
        visibility: "visible",
      }
    );

    let truckTL = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });

    truckTL
      .fromTo(
        "#cityBg_svg__truck",
        {
          scaleX: 1,
          x: "500",
          y: 0,
          visibility: "visible",
        },
        {
          x: "-1000",
          visibility: "visible",
          duration: 20,
          y: 0,
          scaleX: 1,
          ease: "linear",
        }
      )
      .fromTo(
        "#cityBg_svg__truck",
        {
          scaleX: -1,
          x: "-1000",
          y: 15,
          immediateRender: false,
        },
        {
          scaleX: -1,
          x: "1000",
          y: 15,
          duration: 20,
          ease: "linear",
          visibility: "visible",
        }
      );

    let wheelTL = gsap.timeline({ repeat: -1 });

    // Add wheel animations to the timeline
    wheelTL.to(
      "#cityBg_svg__truck_x5F_front_x5F_wheel, #cityBg_svg__truck_x5F_rear_x5F_wheel",
      {
        rotation: -540,
        transformOrigin: "center",
        duration: 1,
        ease: "linear",
      }
    );

    wheelTL.to(
      "#cityBg_svg__car-back-wheel, #cityBg_svg__car-front-wheel,  #cityBg_svg__suv-front-wheel, #cityBg_svg__suv-rear-wheel",
      {
        rotation: 720,
        transformOrigin: "center",
        duration: 1,
        ease: "linear",
      },
      0
    ); // Offset of 0 to make the second wheel start rotating at the same time as the first wheel

    wheelTL.play();
    suvTL.play();
    truckTL.play();
    carTL.play();
  }, []);
  return null;
}
