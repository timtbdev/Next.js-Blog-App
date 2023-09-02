import '@/styles/tailwind.css';
import TwIndicator from '@/components/shared/tw-indicator';
import { metaData } from '@/config/meta';
import { cn, getOgImageUrl, getUrl } from '@/lib/utils';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        template: '%s | Next.js Blog',
        default: metaData.title,
        absolute: metaData.absoluteTitle,
    },
    generator: metaData.author.name,
    applicationName: metaData.title,
    description: metaData.description,
    referrer: 'origin-when-cross-origin',
    keywords: metaData.keywords,
    authors: [
        {
            name: metaData.author.name,
            url: metaData.author.twitterUrl,
        },
    ],
    creator: metaData.author.name,
    publisher: metaData.author.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(getUrl()),
    alternates: {
        canonical: '/',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
        viewportFit: 'cover',
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    icons: {
        icon: [
            { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            {
                url: '/favicons/android-icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
        ],
        shortcut: ['/favicons/favicon-32x32.png'],
        apple: [
            { url: '/favicons/apple-icon.png' },
            { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            {
                rel: 'apple-touch-icon-precomposed',
                url: '/favicons/apple-icon-precomposed.png',
            },
        ],
    },

    manifest: `${getUrl()}/favicons/manifest.json`,

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: getUrl(),
        title: metaData.title,
        description: metaData.description,
        siteName: metaData.title,
        images: [
            {
                url: getOgImageUrl(metaData.title, metaData.subTitle, metaData.tags, '/'),
                width: 1200,
                height: 630,
                alt: metaData.title,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: metaData.ogTitle,
        description: metaData.description,
        images: [getOgImageUrl(metaData.title, metaData.subTitle, metaData.tags, '/')],
        creator: metaData.author.twitterAddress,
    },
    appleWebApp: {
        capable: true,
        title: metaData.title,
        statusBarStyle: 'black-translucent',
    },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={fontSans.variable}>
                <div className="bg-white font-sans">
                    {children}
                    <VercelAnalytics />
                    <Toaster position="top-center" />
                    <TwIndicator />
                </div>
            </body>
        </html>
    );
}
