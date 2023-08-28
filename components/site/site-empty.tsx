import { emptyConfig } from '@/config/empty';
import { AlertTriangleIcon } from 'lucide-react';
import React from 'react';

export const SiteEmpty = () => {
    return (
        <div className="max-w-3xl bg-white mx-auto rounded-lg my-5 border-2 border-dashed border-gray-300 p-12 text-center">
            <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-md font-semibold text-gray-900">{emptyConfig.empty}</h3>
            <p className="mt-1 text-md text-gray-500">{emptyConfig.description}</p>
        </div>
    );
};
