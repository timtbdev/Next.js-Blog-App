import { footer } from '@/config/site';
import React from 'react';

const ProtectedFooter = () => {
    return (
        <footer className="border-t border-gray-100 py-6 sm:py-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 sm:flex-row lg:px-8">
                <p className="text-sm leading-7 text-gray-400">{footer.copyright}</p>
            </div>
        </footer>
    );
};

export default ProtectedFooter;
