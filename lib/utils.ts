import { createHash } from 'crypto';
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

// Utils for comment section
// Regular expression to match all punctuation
export const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export function isEmail({ email }: { email: string }) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
        email
    );
}

export function autosize(target: HTMLTextAreaElement): void {
    target.style.height = 'initial';
    target.style.height = +target.scrollHeight + 'px';
}

export function countLines(el: HTMLElement): number {
    if (!el) return -1;
    const divHeight = el.offsetHeight;
    const lineHeight = parseInt(window.getComputedStyle(el).getPropertyValue('line-height'));
    const lines = divHeight / lineHeight;
    return lines;
}

export function getUrl() {
    if (process.env.NODE_ENV === 'development') {
        return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    } else {
        return process.env.NEXT_PUBLIC_WEB_URL || 'https://ub.cafe';
    }
}

export function getHash(ip: string) {
    return createHash('sha256').update(ip).digest('base64');
}
