import React from "react";

interface MessageColorProps {
  className: string;
}

const MessageColor: React.FC<MessageColorProps> = ({ className = "" }) => {
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
            d="M47 22C47 11.5 36.7 3 24 3C11.3 3 1 11.5 1 22C1 32.5 11.3 41 24 41C26.054 41.014 28.102 40.779 30.1 40.3L41.6 44.9C41.7 44.9 41.8 45 42 45C42.212 44.979 42.418 44.911 42.6 44.8C42.87 44.581 43.018 44.247 43 43.9L41.9 33.9C45.109 30.765 46.943 26.485 47 22Z"
            fill="url(#nc-ui-6-0_linear_215_38)"
          ></path>{" "}
          <path
            d="M34 19H14C13.447 19 13 18.553 13 18C13 17.447 13.447 17 14 17H34C34.553 17 35 17.447 35 18C35 18.553 34.553 19 34 19Z"
            fill="url(#nc-ui-6-1_linear_215_38)"
          ></path>{" "}
          <path
            d="M26 27H14C13.447 27 13 26.553 13 26C13 25.447 13.447 25 14 25H26C26.553 25 27 25.447 27 26C27 26.553 26.553 27 26 27Z"
            fill="url(#nc-ui-6-2_linear_215_38)"
          ></path>{" "}
          <defs>
            {" "}
            <linearGradient
              id="nc-ui-6-0_linear_215_38"
              x1="24"
              y1="3"
              x2="24"
              y2="45"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#FDDACE"></stop>{" "}
              <stop offset="1" stopColor="#FBAE93"></stop>{" "}
            </linearGradient>{" "}
            <linearGradient
              id="nc-ui-6-1_linear_215_38"
              x1="13"
              y1="18"
              x2="35"
              y2="18"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#F98E5E"></stop>{" "}
              <stop offset="1" stopColor="#EA6524"></stop>{" "}
            </linearGradient>{" "}
            <linearGradient
              id="nc-ui-6-2_linear_215_38"
              x1="13"
              y1="26"
              x2="27"
              y2="26"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#F98E5E"></stop>{" "}
              <stop offset="1" stopColor="#EA6524"></stop>{" "}
            </linearGradient>{" "}
          </defs>
        </g>
      </svg>
    </>
  );
};

export default MessageColor;
