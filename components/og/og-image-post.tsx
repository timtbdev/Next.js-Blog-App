import { FC } from 'react';
import { OgWrapper } from './og-wrapper';
import { metaData } from '@/config/meta';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface OgImageProps {
    title: string;
    image: string;
    author_name: string;
    author_image: string;
    author_title: string;
}

export const OgImage: FC<OgImageProps> = ({ title, image, author_name, author_image, author_title }) => {
    return (
        <>
            <OgWrapper>
                <div tw="flex flex-col w-full h-full items-center justify-center bg-gray-100">
                    <div
                        tw="px-10 items-baseline rounded-md"
                        style={{
                            left: 28,
                            top: 42,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div tw="flex text-gray-900 items-baseline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                }}
                            >
                                <rect
                                    data-element="frame"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                    rx="24"
                                    ry="24"
                                    stroke="none"
                                    fill="#5e5e5e"
                                ></rect>
                                <g
                                    transform="translate(6 6) scale(0.5)"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    fill="none"
                                    stroke="#ffffff"
                                >
                                    <line x1="10" y1="1" x2="10" y2="3" stroke="#ffffff"></line>{' '}
                                    <line x1="5" y1="1" x2="5" y2="3" stroke="#ffffff"></line>{' '}
                                    <line x1="15" y1="1" x2="15" y2="3" stroke="#ffffff"></line>{' '}
                                    <path d="M14,23H6c-2.2,0-4-1.8-4-4 V7h16v12C18,21.2,16.2,23,14,23z"></path>{' '}
                                    <path d="M18,7h4v4c0,1.1-0.9,2-2,2 h-2"></path>
                                </g>
                            </svg>
                        </div>
                        <span
                            tw="text-md font-semibold"
                            style={{
                                marginLeft: 8,
                                fontSize: 30,
                            }}
                        >
                            {metaData.title}
                        </span>
                    </div>

                    <div tw="flex w-full mt-10">
                        <div tw="flex flex-row w-full items-center px-16">
                            <div tw="flex flex-col ml-">
                                <img src={image} height={300} width={300} tw="rounded-xl bg-white lg:rounded-3xl" />
                            </div>
                            <div tw="flex flex-col ml-5">
                                <div tw="flex">
                                    <span tw="flex uppercase items-center break-words truncate max-w-md w-justify-start px-5 py-3 font-semibold text-4xl text-gray-900 ">
                                        {title}
                                    </span>
                                </div>
                                <div tw="flex flex-row px-5 py-2 items-cener">
                                    <img src={author_image} height={40} width={40} tw="rounded-full" />
                                    <span tw="flex tracking-tight items-center px-4 text-2xl font-semibold text-gray-900">
                                        {author_name}
                                    </span>
                                </div>
                                <div tw="flex">
                                    <span tw="flex tracking-tight items-center justify-start px-5 py-3 font-semibold text-2xl text-gray-600 ">
                                        {author_title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OgWrapper>
        </>
    );
};
