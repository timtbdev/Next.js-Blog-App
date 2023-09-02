import { emptyConfig } from '@/config/empty';
import { AlertTriangleIcon } from 'lucide-react';
import React from 'react';

export const SiteEmpty = () => {
    return (
        <div className="mx-auto my-5 max-w-3xl rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-md mt-2 font-semibold text-gray-900">{emptyConfig.title}</h3>
            <p className="text-md mt-1 text-gray-500">{emptyConfig.description}</p>
        </div>
    );
};
