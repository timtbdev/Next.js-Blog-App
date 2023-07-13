import React from "react";

interface ShareColorProps {
  className: string;
}

const ShareColor: React.FC<ShareColorProps> = ({ className = "" }) => {
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
            d="M14.002 24C13.281 24 12.586 23.61 12.229 22.928C11.716 21.949 12.094 20.74 13.073 20.228L34.073 9.22798C35.051 8.71398 36.26 9.09298 36.772 10.071C37.285 11.05 36.907 12.259 35.928 12.771L14.928 23.771C14.632 23.926 14.315 24 14.002 24Z"
            fill="url(#nc-ui-3-0_linear_119_43)"
          ></path>{" "}
          <path
            d="M34.9981 39C34.6861 39 34.368 38.926 34.072 38.771L13.072 27.771C12.093 27.259 11.716 26.05 12.228 25.071C12.741 24.093 13.95 23.715 14.927 24.228L35.927 35.228C36.906 35.74 37.283 36.949 36.771 37.928C36.414 38.61 35.7181 39 34.9981 39Z"
            fill="url(#nc-ui-3-1_linear_119_43)"
          ></path>{" "}
          <path
            d="M10 32C14.4183 32 18 28.4183 18 24C18 19.5817 14.4183 16 10 16C5.58172 16 2 19.5817 2 24C2 28.4183 5.58172 32 10 32Z"
            fill="url(#nc-ui-3-2_linear_119_43)"
          ></path>{" "}
          <path
            d="M37 18C41.4183 18 45 14.4183 45 10C45 5.58172 41.4183 2 37 2C32.5817 2 29 5.58172 29 10C29 14.4183 32.5817 18 37 18Z"
            fill="url(#nc-ui-3-3_linear_119_43)"
          ></path>{" "}
          <path
            d="M37 46C41.4183 46 45 42.4183 45 38C45 33.5817 41.4183 30 37 30C32.5817 30 29 33.5817 29 38C29 42.4183 32.5817 46 37 46Z"
            fill="url(#nc-ui-3-4_linear_119_43)"
          ></path>{" "}
          <defs>
            {" "}
            <linearGradient
              id="nc-ui-3-0_linear_119_43"
              x1="24.5005"
              y1="8.99854"
              x2="24.5005"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#6AD084"></stop>{" "}
              <stop offset="1" stopColor="#3CB34B"></stop>{" "}
            </linearGradient>{" "}
            <linearGradient
              id="nc-ui-3-1_linear_119_43"
              x1="24.4995"
              y1="23.999"
              x2="24.4995"
              y2="39"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#6AD084"></stop>{" "}
              <stop offset="1" stopColor="#3CB34B"></stop>{" "}
            </linearGradient>{" "}
            <linearGradient
              id="nc-ui-3-2_linear_119_43"
              x1="10"
              y1="16"
              x2="10"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#9EE0B1"></stop>{" "}
              <stop offset="1" stopColor="#6AD084"></stop>{" "}
            </linearGradient>{" "}
            <linearGradient
              id="nc-ui-3-3_linear_119_43"
              x1="37"
              y1="2"
              x2="37"
              y2="18"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#9EE0B1"></stop>{" "}
              <stop offset="1" stopColor="#6AD084"></stop>{" "}
            </linearGradient>{" "}
            <linearGradient
              id="nc-ui-3-4_linear_119_43"
              x1="37"
              y1="30"
              x2="37"
              y2="46"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#9EE0B1"></stop>{" "}
              <stop offset="1" stopColor="#6AD084"></stop>{" "}
            </linearGradient>{" "}
          </defs>
        </g>
      </svg>
    </>
  );
};

export default ShareColor;
