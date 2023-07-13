import React from "react";

interface ShareOutlineProps {
  className: string;
}

const ShareOutline: React.FC<ShareOutlineProps> = ({ className = "" }) => {
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
            x1="7.6"
            y1="10.5"
            x2="16.4"
            y2="5.5"
            strokeLinecap="butt"
            stroke="currentColor"
          ></line>{" "}
          <line
            x1="7.6"
            y1="13.5"
            x2="16.4"
            y2="18.5"
            strokeLinecap="butt"
            stroke="currentColor"
          ></line>{" "}
          <circle cx="5" cy="12" r="3"></circle>{" "}
          <circle cx="19" cy="4" r="3"></circle>{" "}
          <circle cx="19" cy="20" r="3"></circle>
        </g>
      </svg>
    </>
  );
};

export default ShareOutline;
