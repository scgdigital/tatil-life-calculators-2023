import { useRef, useState } from "react";
import styles from "@/parts/FormParts/styles.module.css";
// @ts-ignore
import WaiverDefaultIcon from "@/assets/svg/waiverExampleIcon.svg";
import { AddOrRemoveIcon } from "@/components/AddOrRemoveIcon";
import { cx } from "class-variance-authority";
import { gsap } from "gsap";

export const WaiverOption = (waiver: Record<string, any>, index: number) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [resolvedPrice, setResolvedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadingRef = useRef<HTMLDivElement | null>(null); // reference for your loading div
  const priceRef = useRef<HTMLDivElement | null>(null); // reference for your price div
  const toggle = async () => {
    setIsEnabled((previousState) => !previousState);
    setIsLoading(true);

    if (isEnabled) {
      // if the toggle was enabled, revert the animation
      gsap.to(loadingRef.current, {
        width: 0,
        transformOrigin: "right",
        duration: 1,
      });
      gsap.to(priceRef.current, {
        width: "0px",
        transformOrigin: "right",
        duration: 1,
        onComplete: () => {
          setResolvedPrice(null);
          setIsLoading(false);
        },
      });
    } else {
      // start the loading animation
      gsap.fromTo(
        loadingRef.current,
        { width: 0, transformOrigin: "right" },
        { width: "100%", duration: 1, ease: "power1.inOut" }
      );

      // simulate server call
      const response = await new Promise<number>((resolve) =>
        setTimeout(
          () => resolve(Math.floor(Math.random() * (350 - 100 + 1)) + 100),
          3000
        )
      );

      // end the loading animation
      gsap.to(loadingRef.current, {
        width: 0,
        transformOrigin: "right",
        duration: 0.2,
        onComplete: () => {
          // set the resolved price
          setResolvedPrice(response);

          // animate to show the resolved price
          gsap.to(priceRef.current, {
            width: "auto",
            duration: 1,
            onComplete: () => setIsLoading(false),
          });
        },
      });
    }
  };

  return (
    <div
      className="flex items-center w-full justify-between"
      key={waiver.title + "-" + index}
    >
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex items-center">
          <WaiverDefaultIcon className="w-8 h-8 fill-tatil-red ml-3" />
          <div className="ml-2 font-medium text-left">{waiver.title}</div>
        </div>
        <div className="relative flex items-center flex-shrink-0 h-6 w-[100px] ml-3">
          <div
            ref={loadingRef}
            style={{ width: 0 }}
            className={cx(
              "w-8 h-4 rounded-full animate-gradient-x bg-tatil-gradient absolute left-0 top-1/2 -translate-y-1/2",
              styles.bigBG
            )}
          />
          <div
            ref={priceRef}
            style={{ width: 0 }}
            className="font-medium text-tatil-red absolute top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            {/* format the resolved price to a currency */}
            {resolvedPrice?.toLocaleString() ? (
              <>
                +${resolvedPrice.toLocaleString()}{" "}
                <span className="text-xs font-light text-[#555]">/ month</span>{" "}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <AddOrRemoveIcon
        onClick={toggle}
        className={cx(
          "text-tatil-red font-2xl font-bold font-sans flex items-center min-h-[30px] rounded-full border-2 p-2 border-tatil-red gap-x-2 transition-colors w-[100px] flex-shrink-0 flex-grow-0",
          isLoading ? "opacity-60" : ""
        )}
        disabled={isLoading}
      />
    </div>
  );
};
