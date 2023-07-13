import React from "react";

interface HeartOutlineProps {
  className: string;
}

const HeartOutline: React.FC<HeartOutlineProps> = ({ className = "" }) => {
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
          <path d="M20.554,11.889,12,20.778,3.446,11.889A5.265,5.265,0,1,1,12,5.964a5.265,5.265,0,1,1,8.554,5.925Z"></path>
        </g>
      </svg>
    </>
  );
};

export default HeartOutline;
