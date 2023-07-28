import React from "react";

interface CheckProps {
  className: string;
}

const Check: React.FC<CheckProps> = ({ className = "" }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={className}
      >
        <title>c-check</title>
        <g fill="currentColor">
          <path
            d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12,12-5.373,12-12C23.981,5.381,18.619,.019,12,0Zm7.207,7.707l-9,9c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-4-4c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l3.293,3.293L17.793,6.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default Check;
