import React from "react";

interface ClapsOutlineProps {
  className: string;
}

const ClapsOutline: React.FC<ClapsOutlineProps> = ({ className = "" }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
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
          <path
            d="M31.38,9.71,24.4,2.732a2.5,2.5,0,0,0-3.585.051h0a2.5,2.5,0,0,0,.05,3.485l7.649,7.649"
            strokeLinecap="butt"
            stroke="currentColor"
          ></path>{" "}
          <path
            d="M21.916,7.324l-3.9-3.872a2.5,2.5,0,0,0-3.585.051h0a2.5,2.5,0,0,0,.05,3.485"
            strokeLinecap="butt"
            stroke="currentColor"
          ></path>{" "}
          <path
            d="M43.616,28a13.9,13.9,0,0,0,.394-9.843c-1.465-4.379-3.547-9.318-4.545-13.8a2.751,2.751,0,1,0-5.388,1.1,54.989,54.989,0,0,1,.589,8.271"
            strokeLinecap="butt"
            stroke="currentColor"
          ></path>{" "}
          <path d="M7.926,23.469a2.736,2.736,0,0,0-3.8-.028h0a2.712,2.712,0,0,0-.055,3.891L19.4,42.66a11.41,11.41,0,0,0,16.133,0h0a15.149,15.149,0,0,0,3.68-15.509c-1.589-4.753-3.849-10.114-4.933-14.984a2.986,2.986,0,1,0-5.849,1.2c.028.222.634,4.746,1.289,8.126a.276.276,0,0,1-.467.246L17.925,10.406a2.714,2.714,0,0,0-3.891.055h0a2.714,2.714,0,0,0,.054,3.783l9.582,9.582"></path>{" "}
          <path d="M7.929,15.8a2.712,2.712,0,0,0-3.782-.054h0a2.714,2.714,0,0,0-.056,3.892L15.976,31.519"></path>{" "}
          <path d="M14.314,14.47,11,11.188a2.713,2.713,0,0,0-3.892.055h0a2.715,2.715,0,0,0,.054,3.783L19.818,27.678"></path>
        </g>
      </svg>
    </>
  );
};

export default ClapsOutline;
