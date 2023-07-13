import React from "react";

interface ArrowUpOutlineProps {
  className: string;
}

const ArrowUpOutline: React.FC<ArrowUpOutlineProps> = ({ className = "" }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={className}
      >
        <g
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
        >
          <line
            x1="12"
            y1="18"
            x2="12"
            y2="7"
            strokeLinecap="butt"
            stroke="currentColor"
          ></line>
          <polyline points="8 11 12 7 16 11" stroke="currentColor"></polyline>
          <rect x="2" y="2" width="20" height="20" rx="2"></rect>
        </g>
      </svg>
    </>
  );
};

export default ArrowUpOutline;
