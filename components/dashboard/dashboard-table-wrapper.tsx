import React from 'react';

interface DashBoardTableWrapperProps {
    children?: React.ReactNode;
}

const DashBoardTableWrapper: React.FC<DashBoardTableWrapperProps> = ({ children }) => {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">{children}</table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardTableWrapper;
