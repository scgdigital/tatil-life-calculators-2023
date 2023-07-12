import { cx } from "class-variance-authority";
import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

interface AddOrRemoveIconProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const AddOrRemoveIcon = ({
  disabled,
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
            setIsPlus((prevPlus) => !prevPlus);
          },
        })
        .to(animationRef.current, {
          rotation: 360,
          duration: 0.5,
          color: "#fff",
          onReverseComplete: () => {
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
      disabled={disabled}
      type="button"
      onClick={handleClick}
      className={cx(
        "transition-colors",
        isPlus ? "bg-white" : "bg-tatil-red",
        className
      )}
    >
      <div ref={animationRef}>{isPlus ? "＋" : "－"}</div>
      <div ref={labelRef} className="text-sm min-w-[50px]">
        {label}
      </div>
    </button>
  );
};
