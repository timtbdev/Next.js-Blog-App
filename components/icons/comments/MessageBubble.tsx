import React from "react";

interface MessageBubbleProps {
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M1 10.944a9.311 9.311 0 001 4.223 9.445 9.445 0 008.444 5.222 9.312 9.312 0 004.223-1L21 21.5l-2.111-6.333a9.312 9.312 0 001-4.223A9.445 9.445 0 0014.667 2.5a9.311 9.311 0 00-4.223-1H9.89A9.422 9.422 0 001 10.389v.555z" />
    </svg>
  );
};

export default MessageBubble;
