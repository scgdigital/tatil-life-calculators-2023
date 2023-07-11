import { CoverAmountInput } from "@/components/CoverAmountInput";
import { useFormikContext } from "formik";
import { gsap } from "gsap";
import { get } from "lodash-es";
import { useEffect, useRef, useState } from "react";

// @ts-ignore
import WaiverDefaultIcon from "@/assets/svg/waiverExampleIcon.svg";
import { cx } from "class-variance-authority";

export const CoverAmountSelect = () => {
  const { values, errors, setFieldValue, getFieldMeta } =
    useFormikContext<any>();
  return (
    <div className="w-full flex flex-wrap divide-y lg:divide-y-0 divide-tatil-grey">
      <div className="basis-full lg:basis-1/2 flex-shrink-0 py-3 flex items-center">
        <div className="basis-full flex-shrink-0 h-full lg:min-h-[100px]">
          <CoverAmountInput
            name="coverAmount"
            value={values.coverAmount}
            onChange={(value: string) => {
              setFieldValue("coverAmount", value ? value : "");
            }}
            error={get(errors, "coverAmount", "") as string}
            touched={getFieldMeta("coverAmount")?.touched}
            placeholder="$1,000,000"
          />
        </div>
      </div>
      <div className="basis-full lg:basis-1/2 flex-shrink-0 py-3 flex items-center">
        <div className="basis-full flex-shrink-0 min-h-[100px] flex flex-col items-start lg:items-end">
          <div className="flex flex-col items-start">
            <div className="font-bold leading-6 text-left mb-3 lg:mb-6 select-none">
              Start your policy today for
            </div>
            <div className="flex flex-col text-left">
              <div className="inline-flex gap-x-2 justify-start lg:justify-end items-end w-full">
                <div
                  id="quote-figure"
                  className="text-3xl font-bold text-tatil-black tracking-wide text-left w-fit"
                >
                  $2,096.00
                </div>
                <span className="text-tatil-black font-light text-sm mb-1">
                  / per month
                </span>
              </div>
              <div className="text-tatil-black font-light text-xs lg:text-sm text-left w-full">
                Pay annually, save $503.20
              </div>
              <a className="my-3 text-tatil-red underline font-light text-xs lg:text-sm cursor-pointer">
                View full table of benefits
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-full flex-shrink-0 py-3 flex items-center">
        <div className="basis-full flex-shrink-0 min-h-[100px] w-full text-left lg:border-t lg:border-tatil-grey py-5 flex flex-col gap-y-5 bg-tatil-white/50">
          <WholeLifeWaivers />
        </div>
      </div>
    </div>
  );
};

export const WholeLifeWaivers = ({
  waivers = [
    {
      icon: "",
      title: "Waiver of Premium on Disability",
      description: "",
      price: "+$350.00",
    },
    {
      icon: "",
      title: "Waiver of Premium on Disability",
      description: "",
      price: "+$350.00",
    },
  ],
}) => {
  return (
    <>
      {waivers?.map((waiver, index) => {
        return (
          <div className="flex items-center" key={waiver.title + "-" + index}>
            {/* <Image
              src={!isEmpty(waiver?.icon) ? waiver.icon : WaiverDefaultIcon}
              width={30}
              height={30}
              alt={waiver.title}
              className="w-8 h-8 fill-tatil-red"
            /> */}
            <WaiverDefaultIcon className="w-8 h-8 fill-tatil-red" />
            <div className="ml-3 font-medium">{waiver.title}</div>
            <div className="ml-auto font-medium text-tatil-red">
              {waiver.price}
            </div>
            <AddOrRemoveIcon
              onClick={() => {}}
              className="ml-3 text-tatil-red font-2xl font-bold font-sans flex items-center min-h-[30px] rounded-full border-2 p-2 border-tatil-red gap-x-2 transition-colors"
            />
          </div>
        );
      })}
    </>
  );
};

interface AddOrRemoveIconProps {
  onClick: () => void;
  className?: string;
}

export const AddOrRemoveIcon = ({
  onClick,
  className = "",
}: AddOrRemoveIconProps) => {
  const [isPlus, setIsPlus] = useState(true);
  const [label, setLabel] = useState<"Add" | "Remove">("Add"); // ["Add", "Remove"
  const [animation, setAnimation] = useState<TimelineMax | null>(null);
  const animationRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animationRef.current && labelRef.current) {
      const iconTimeline = gsap.timeline();
      iconTimeline
        .to(animationRef.current, {
          rotation: 180,
          scale: 1.5,
          color: "#FF868A",
          onComplete: () => {
            console.log("onComplete");
            setIsPlus((prevPlus) => !prevPlus);
          },
        })
        .to(animationRef.current, {
          rotation: 360,
          duration: 0.5,
          color: "#fff",
          onReverseComplete: () => {
            console.log("onReverseComplete");
            setIsPlus((prevPlus) => !prevPlus);
          },
        });

      const labelTimeline = gsap.timeline();
      labelTimeline
        .to(labelRef.current, {
          x: 10,
          opacity: 0,
          color: "#FF868A",
          onComplete: () => {
            setLabel(isPlus ? "Remove" : "Add");
          },
        })
        .to(labelRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          color: "#fff",
          onReverseComplete: () => {
            setLabel(!isPlus ? "Remove" : "Add");
          },
        });

      const combinedTimelines = gsap.timeline({
        paused: true,
        reversed: true,
      });
      combinedTimelines.add(iconTimeline, 0);
      combinedTimelines.add(labelTimeline, 0);

      setAnimation(combinedTimelines);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    onClick();
    if (animation) {
      animation.reversed()
        ? animation.timeScale(2).play()
        : animation.timeScale(2).reverse();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        "transition-colors",
        isPlus ? "bg-white" : "bg-tatil-red",
        className
      )}
    >
      <div ref={animationRef}>{isPlus ? "＋" : "－"}</div>
      <div ref={labelRef} className="text-sm min-w-[56px]">
        {label}
      </div>
    </button>
  );
};
