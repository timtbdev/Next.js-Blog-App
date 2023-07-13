import React from "react";

interface CopyProps {
  className: string;
}

const Copy: React.FC<CopyProps> = ({ className = "" }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className={className}
      >
        <g>
          <path
            fill="#335262"
            d="M45,47H15c-1.105,0-2-0.895-2-2V14.881c0-1.105,0.895-2,2-2h30c1.105,0,2,0.895,2,2V45 C47,46.105,46.105,47,45,47z"
          ></path>{" "}
          <path
            fill="#5A7A84"
            d="M33,35H3c-1.105,0-2-0.895-2-2V2.881c0-1.105,0.895-2,2-2h30c1.105,0,2,0.895,2,2V33 C35,34.105,34.105,35,33,35z"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default Copy;
