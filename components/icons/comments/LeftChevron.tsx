import * as React from "react";

interface LeftChevronProps {
  className?: string;
}

const LeftChevron: React.FC<LeftChevronProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
};

export default LeftChevron;
