import React from 'react';

interface HeartColorProps {
    className: string;
}

const HeartColor: React.FC<HeartColorProps> = ({ className = '' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className={className}>
                <g>
                    <path
                        d="M24,44a1,1,0,0,1-.73-.316L6.246,25.5A11.493,11.493,0,1,1,24,11.039,11.493,11.493,0,1,1,41.74,25.514L24.73,43.684A1,1,0,0,1,24,44Z"
                        fill="#f74b3b"
                    ></path>
                </g>
            </svg>
        </>
    );
};

export default HeartColor;
