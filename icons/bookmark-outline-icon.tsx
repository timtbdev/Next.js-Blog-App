import { FC } from "react";

interface BookmarkOutlineIconProps {
  className: string;
}

const BookmarkOutlineIcon: FC<BookmarkOutlineIconProps> = ({
  className = "",
}) => {
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
          <path d="M21,22l-9-5L3,22V3A2,2,0,0,1,5,1H19a2,2,0,0,1,2,2Z"></path>
        </g>
      </svg>
    </>
  );
};

export default BookmarkOutlineIcon;
