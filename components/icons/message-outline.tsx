import React from "react";

interface MessageOutlineProps {
  className: string;
}

const MessageOutline: React.FC<MessageOutlineProps> = ({ className = "" }) => {
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
          <path d="M20.4,16.8 C22,15.2,23,13.2,23,11c0-5-4.9-9-11-9S1,6,1,11c0,5,4.9,9,11,9c1.1,0,2.1-0.1,3.1-0.4L21,22L20.4,16.8z"></path>{" "}
          <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor"></line>{" "}
          <line x1="8" y1="13" x2="13" y2="13" stroke="currentColor"></line>
        </g>
      </svg>
    </>
  );
};

export default MessageOutline;
