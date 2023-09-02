'use client';

import React from 'react';
import ScrollToTop from 'react-scroll-to-top';
import ScrollToTopOpening from '../shared/scroll-to-top';

const ScrollUpButton = () => {
    return (
        <>
            <ScrollToTop
                style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                }}
                className="rounded-full bg-slate-50 p-2.5 !shadow-sm !ring-1 !ring-slate-300"
                smooth
                component={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 rotate-90 text-slate-500 group-hover:text-slate-700"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                    </svg>
                }
            />
            <ScrollToTopOpening />
        </>
    );
};

export default ScrollUpButton;
