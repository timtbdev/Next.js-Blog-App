import React from 'react';

interface ProtectedTitleProps {
    title?: string;
}

const ProtectedTitle: React.FC<ProtectedTitleProps> = ({ title = '' }) => {
    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                </div>
            </div>
        </>
    );
};

export default ProtectedTitle;
