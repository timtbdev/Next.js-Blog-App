"use client";
import React from "react";
import ClapsOutline from "@/components/icons/claps-outline";
import ClapsSolid from "@/components/icons/claps-solid";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";

const explosionProps: ConfettiProps = {
  force: 0.4,
  duration: 2200,
  particleCount: 30,
  width: 400,
};

const ClapsButton = () => {
  const [isHovering, setIsHovered] = React.useState(false);
  const [isExploding, setIsExploding] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <button
      type="button"
      onClick={() => setIsExploding(!isExploding)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white bg-opacity-70 backdrop-blur-lg backdrop-filter px-3 py-2 text-sm font-semibold text-gray-900 border-y-[1.5px] border-l-[1.5px] border-gray-300 hover:bg-gray-50 focus:z-10"
    >
      {isExploding && <ConfettiExplosion {...explosionProps} />}
      {isHovering ? (
        <ClapsSolid className="-ml-0.5 h-5 w-5 text-gray-900" />
      ) : (
        <ClapsOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      )}
      66
    </button>
  );
};

export default ClapsButton;
