import React from 'react';
import { termsConfig } from '@/config/terms';

const TermsPage = () => {
    return (
        <div className="bg-white py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {termsConfig.title}
                    </p>

                    {termsConfig.paragraphs.map((item) => (
                        <>
                            <p className="text-md mt-8 leading-8 text-gray-600">{item.description}</p>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
