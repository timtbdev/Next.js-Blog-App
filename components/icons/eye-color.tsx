import React from "react";

interface EyeColorProps {
  className: string;
}

const EyeColor: React.FC<EyeColorProps> = ({ className = "" }) => {
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
            d="M46.424 22.162C43.458 17.9 35.336 8 24 8C12.565 8 4.50002 17.911 1.56602 22.176C0.818022 23.278 0.821022 24.726 1.57502 25.824C4.53702 30.087 12.65 40 24 40C35.246 40 43.42 30.1 46.414 25.836C47.182 24.733 47.186 23.269 46.424 22.162Z"
            fill="url(#nc-ui-5-0_linear_207_74)"
          ></path>
          <path
            d="M24 35C30.0751 35 35 30.0751 35 24C35 17.9249 30.0751 13 24 13C17.9249 13 13 17.9249 13 24C13 30.0751 17.9249 35 24 35Z"
            fill="url(#nc-ui-5-1_linear_207_74)"
          ></path>
          <path
            d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z"
            fill="url(#nc-ui-5-2_linear_207_74)"
          ></path>
          <path
            d="M19.5 23C20.8807 23 22 21.8807 22 20.5C22 19.1193 20.8807 18 19.5 18C18.1193 18 17 19.1193 17 20.5C17 21.8807 18.1193 23 19.5 23Z"
            fill="url(#nc-ui-5-3_linear_207_74)"
          ></path>
          <defs>
            <linearGradient
              id="nc-ui-5-0_linear_207_74"
              x1="24"
              y1="8"
              x2="24"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E0E0E6"></stop>
              <stop offset="1" stopColor="#C2C3CD"></stop>
            </linearGradient>
            <linearGradient
              id="nc-ui-5-1_linear_207_74"
              x1="24"
              y1="13"
              x2="24"
              y2="35"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B88163"></stop>
              <stop offset="1" stopColor="#976545"></stop>
            </linearGradient>
            <linearGradient
              id="nc-ui-5-2_linear_207_74"
              x1="24"
              y1="18"
              x2="24"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#393A46"></stop>
              <stop offset="1" stopColor="#17181C"></stop>
            </linearGradient>
            <linearGradient
              id="nc-ui-5-3_linear_207_74"
              x1="19.5"
              y1="18"
              x2="19.5"
              y2="23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </g>
      </svg>
    </>
  );
};

export default EyeColor;
