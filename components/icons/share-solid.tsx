import React from "react";

interface ShareSolidProps {
  className: string;
}

const ShareSolid: React.FC<ShareSolidProps> = ({ className = "" }) => {
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
          <path
            fill="currentColor"
            d="M19,8c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4c0,0.4,0.1,0.7,0.2,1L7.9,9.2C7.1,8.5,6.1,8,5,8 c-2.2,0-4,1.8-4,4s1.8,4,4,4c1.1,0,2.1-0.5,2.9-1.2l7.3,4.2c-0.1,0.3-0.2,0.7-0.2,1c0,2.2,1.8,4,4,4s4-1.8,4-4s-1.8-4-4-4 c-1.1,0-2.1,0.5-2.9,1.2L8.8,13C8.9,12.7,9,12.4,9,12s-0.1-0.7-0.2-1l7.3-4.2C16.9,7.5,17.9,8,19,8z"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default ShareSolid;
