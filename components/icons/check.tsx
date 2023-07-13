import React from "react";

interface CheckProps {
  className: string;
}

const Check: React.FC<CheckProps> = ({ className = "" }) => {
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
            d="M23 45C34.598 45 44 35.598 44 24C44 12.402 34.598 3 23 3C11.402 3 2 12.402 2 24C2 35.598 11.402 45 23 45Z"
            fill="url(#nc-ui-6-0_linear_215_69)"
          ></path>{" "}
          <path
            d="M44 5L24 23L15 16L12 19L24 31L47 7L44 5Z"
            fill="url(#nc-ui-6-1_linear_215_69)"
          ></path>{" "}
          <defs>
            {" "}
            <linearGradient
              id="nc-ui-6-0_linear_215_69"
              x1="23"
              y1="3"
              x2="23"
              y2="45"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#D8F3E0"></stop>{" "}
              <stop offset="1" stopColor="#9EE0B1"></stop>{" "}
            </linearGradient>{" "}
            <linearGradient
              id="nc-ui-6-1_linear_215_69"
              x1="29.5"
              y1="5"
              x2="29.5"
              y2="31"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#6AD084"></stop>{" "}
              <stop offset="1" stopColor="#3CB34B"></stop>{" "}
            </linearGradient>{" "}
          </defs>
        </g>
      </svg>
    </>
  );
};

export default Check;
