import { FC, ReactNode } from "react";

interface IconWrapperRoundedProps {
  children: ReactNode;
}

const IconWrapperRounded: FC<IconWrapperRoundedProps> = ({ children }) => {
  return (
    <div className="flex items-center rounded-full bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 p-1 text-center shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20">
      {children}
    </div>
  );
};

export default IconWrapperRounded;
