"use client"
//Tooltip.js
import React, { useState, ReactNode } from "react";

export function WithTooltip({
  content,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex-shrink-0 w-[19px] h-[19px] min-h-[12px] min-w-[12px] select-none" role="tooltip-more-info">
      <div
        className="flex cursor-pointer items-cente flex-shrink-0 w-full h-full flex-grow"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="w-[19px] h-[19px] rounded-full font-bold bg-tatil-grey text-tatil-black text-center">
          i
        </div>
      </div>
      {showTooltip && (
        <div className="absolute bottom-full -left-full -translate-x-1/2 bg-gray-800 text-white rounded-md py-1 px-2 pointer-events-none transition-all duration-300 z-10 text-sm min-w-[100px]">
          {content}
        </div>
      )}
    </div>
  );
}
