import React from 'react';

interface BookmarkSolidProps {
    className: string;
}

const BookmarkSolid: React.FC<BookmarkSolidProps> = ({ className = '' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
                <g fill="currentColor">
                    <path
                        d="M19,0H5A3,3,0,0,0,2,3V23.5a.5.5,0,0,0,.767.423L12,18.092l9.233,5.831A.493.493,0,0,0,21.5,24a.5.5,0,0,0,.5-.5V3A3,3,0,0,0,19,0Z"
                        fill="currentColor"
                    ></path>
                </g>
            </svg>
        </>
    );
};

export default BookmarkSolid;
