import { FC } from "react";

interface MessageSolidIconProps {
  className: string;
}

const MessageSolidIcon: FC<MessageSolidIconProps> = ({ className = "" }) => {
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
            d="M24,11c0-5.5-5.4-10-12-10S0,5.5,0,11s5.4,10,12,10c1,0,2-.1,3-.3l5.6,2.2c.1,0,.2,.1,.4,.1s.4-.1,.6-.2c.3-.2,.4-.6,.4-.9l-.5-4.7c1.6-1.8,2.5-4,2.5-6.2Zm-11,3h-5c-.552,0-1-.448-1-1s.448-1,1-1h5c.552,0,1,.448,1,1s-.448,1-1,1Zm3-4H8c-.552,0-1-.448-1-1s.448-1,1-1h8c.552,0,1,.448,1,1s-.448,1-1,1Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default MessageSolidIcon;
