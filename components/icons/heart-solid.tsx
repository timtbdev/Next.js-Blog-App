import React from 'react';

interface HeartSolidProps {
    className: string;
}

const HeartSolid: React.FC<HeartSolidProps> = ({ className = '' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
                <g fill="currentColor">
                    <path
                        d="M16.722,2A6.205,6.205,0,0,0,12,4.162,6.205,6.205,0,0,0,7.278,2,6.264,6.264,0,0,0,2.726,12.582l8.553,8.889a1,1,0,0,0,1.442,0l8.553-8.889.007-.007A6.264,6.264,0,0,0,16.722,2Z"
                        fill="currentColor"
                    ></path>
                </g>
            </svg>
        </>
    );
};

export default HeartSolid;
