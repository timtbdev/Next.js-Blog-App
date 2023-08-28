import React from 'react';

interface ArrowUpSolidProps {
    className: string;
}

const ArrowUpSolid: React.FC<ArrowUpSolidProps> = ({ className = '' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
                <g fill="currentColor">
                    <path
                        d="M20,1H4A3,3,0,0,0,1,4V20a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V4A3,3,0,0,0,20,1ZM16.451,11.717A.5.5,0,0,1,16,12H13v5a1,1,0,0,1-2,0V12H8a.5.5,0,0,1-.391-.812l4-5a.517.517,0,0,1,.782,0l4,5A.5.5,0,0,1,16.451,11.717Z"
                        fill="currentColor"
                    ></path>
                </g>
            </svg>
        </>
    );
};

export default ArrowUpSolid;
