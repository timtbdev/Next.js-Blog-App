import React from 'react';

interface ProtectedTitleProps {
    title?: string;
    description?: string;
}

const ProtectedTitle: React.FC<ProtectedTitleProps> = ({ title = '', description = '' }) => {
    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold leading-6 text-gray-900">{title}</h1>
                    <p className="text-medium mt-2 leading-6 text-gray-600">{description}</p>
                </div>
            </div>
        </>
    );
};

export default ProtectedTitle;
