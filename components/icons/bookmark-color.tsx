import React from "react";

interface BookMarkColorProps {
  className: string;
}

const BookMarkColor: React.FC<BookMarkColorProps> = ({ className = "" }) => {
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
            d="M37 1H11C8.24 1.003 6.003 3.24 6 6V46C6 46.552 6.448 47 7 47C7.178 47 7.353 46.952 7.507 46.862L24 37.16L40.493 46.86C40.969 47.14 41.582 46.981 41.862 46.505C41.952 46.352 42 46.178 42 46V6C41.997 3.24 39.76 1.003 37 1Z"
            fill="url(#nc-ui-7-0_linear_219_203)"
          ></path>{" "}
          <defs>
            {" "}
            <linearGradient
              id="nc-ui-7-0_linear_219_203"
              x1="24"
              y1="1"
              x2="24"
              y2="47"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#FFD36E"></stop>{" "}
              <stop offset="1" stopColor="#F6B828"></stop>{" "}
            </linearGradient>{" "}
          </defs>
        </g>
      </svg>
    </>
  );
};

export default BookMarkColor;
