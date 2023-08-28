import { CoffeeIcon } from 'lucide-react';
import React from 'react';

interface LogoIconProps {
    className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className={className}>
            <rect
                data-element="frame"
                x="0"
                y="0"
                width="48"
                height="48"
                rx="48"
                ry="48"
                stroke="none"
                fill="#d1d5db"
            ></rect>
            <g transform="translate(12 12) scale(0.5)">
                <path
                    d="M39.5,37h-4a1.5,1.5,0,0,1,0-3h4A2.5,2.5,0,0,0,42,31.5V23H35.5a1.5,1.5,0,0,1,0-3h8A1.5,1.5,0,0,1,45,21.5v10A5.506,5.506,0,0,1,39.5,37Z"
                    fill="#6b7280"
                ></path>{' '}
                <path
                    d="M36,15H6a1,1,0,0,0-1,1V40a7.008,7.008,0,0,0,7,7H30a7.008,7.008,0,0,0,7-7V16A1,1,0,0,0,36,15Z"
                    fill="#64748b"
                ></path>{' '}
                <path d="M20,9a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V8A1,1,0,0,1,20,9Z" fill="#1c1917"></path>{' '}
                <path d="M10,11a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0v6A1,1,0,0,1,10,11Z" fill="#1c1917"></path>{' '}
                <path d="M30,11a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0v6A1,1,0,0,1,30,11Z" fill="#1c1917"></path>
            </g>
        </svg>
    );
};

export default LogoIcon;
