import React from 'react';
import { policyConfig } from '@/config/policy';

const PolicyPage = () => {
    return (
        <div className="bg-white py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {policyConfig.title}
                    </p>
                    <h2 className="text-md my-6 leading-7 text-gray-600">{policyConfig.description}</h2>

                    {policyConfig.paragraphs.map((item) => (
                        <>
                            <p className="mt-6 text-xl font-semibold text-gray-900">{item.title}</p>
                            <p className="text-md mt-2 leading-8 text-gray-600">{item.description}</p>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;
