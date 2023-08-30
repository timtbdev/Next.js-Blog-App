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
export function getOgImageUrl(subTitle: string, title: string, tags: Array<string>, slug: string) {
    const uri = [
        `?title=${encodeURIComponent(title)}`,
        `&subTitle=${encodeURIComponent(subTitle)}`,
        `${tags.map((tag) => `&tags=${encodeURIComponent(tag)}`).join('')}`,
        `&slug=${encodeURIComponent(slug)}`,
        // Joining a multiline string for readability.
    ].join('');

    return `${getUrl()}/api/og${uri}`;
}

// Construction of a Open Graph Images url for Twitter and Facebook
export function getOgImagePostUrl(
    title: string,
    image: string,
    author_name: string,
    author_image: string,
    author_title: string
) {
    const uri = [
        `?title=${encodeURIComponent(title)}`,
        `&image=${encodeURIComponent(image)}`,
        `&author_name=${encodeURIComponent(author_name)}`,
        `&author_image=${encodeURIComponent(author_image)}`,
        `&author_title=${encodeURIComponent(author_title)}`,
        // Joining a multiline string for readability.
    ].join('');

    return `${getUrl()}/api/og-post${uri}`;
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
