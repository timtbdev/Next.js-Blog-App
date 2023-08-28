import React from 'react';

interface IconWrapperRoundedProps {
    children: React.ReactNode;
}

const IconWrapperRounded: React.FC<IconWrapperRoundedProps> = ({ children }) => {
    return (
        <div className="flex text-center items-center rounded-full p-1 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20">
            {children}
        </div>
    );
};

export default IconWrapperRounded;
