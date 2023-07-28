import React from "react";

interface CopyProps {
  className: string;
}

const Copy: React.FC<CopyProps> = ({ className = "" }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={className}
      >
        <g fill="currentColor">
          <path d="M22,7h-3v11c0,0.552-0.448,1-1,1H7v3c0,0.552,0.448,1,1,1h14c0.552,0,1-0.448,1-1V8 C23,7.448,22.552,7,22,7z"></path>{" "}
          <path
            fill="currentColor"
            d="M16,17H2c-0.553,0-1-0.447-1-1V2c0-0.552,0.447-1,1-1h14c0.553,0,1,0.448,1,1v14C17,16.553,16.553,17,16,17z "
          ></path>
        </g>
      </svg>
    </>
  );
};

export default Copy;
