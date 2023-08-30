import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Shadcn UI and for Tailwind CSS
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Reading Time
export function getMinutes(minutes: number) {
    const roundedMinutes = Math.round(minutes);
    return `${roundedMinutes} min`;
}

// Open Graph Images for Twitter and Facebook
export function getOgImageUrl(title: string, subTitle: string, tags: Array<string>, slug: string) {
    const uri = [
        `?title=${encodeURIComponent(title)}`,
        `&subTitle=${encodeURIComponent(subTitle)}`,
        `${tags.map((tag) => `&tags=${encodeURIComponent(tag)}`).join('')}`,
        `&slug=${encodeURIComponent(slug)}`,
        // Joining a multiline string for readability.
    ].join('');

    return `${getUrl()}/api/og${uri}`;
}

// Convert date to string
export const toDateString = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export function getUrl() {
    if (process.env.NODE_ENV === 'development') {
        return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    } else {
        return process.env.NEXT_PUBLIC_WEB_URL || 'https://ub.cafe';
    }
}
