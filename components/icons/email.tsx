import React from "react";

interface EmailProps {
  className: string;
}

const Email: React.FC<EmailProps> = ({ className = "" }) => {
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
            d="M1.4,10.8l2.577,1.952,9-4L6,14.251V21a1,1,0,0,0,1.765.643l3.13-3.719L17.4,22.8a1,1,0,0,0,1.581-.6l4-20a1,1,0,0,0-1.352-1.125l-20,8A1,1,0,0,0,1.4,10.8Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default Email;
