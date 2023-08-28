import { OgImage } from '@/components/og/og-image';
import { ImageResponse } from 'next/server';
import { ogImageSchema } from '@/lib/validations';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const runtime = 'edge';

const jetBrainMonoBold = fetch(new URL('../../../public/fonts/JetBrainsMono-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer()
);

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(`${req.url}`);
        const fontBold = await jetBrainMonoBold;

        const { title, subTitle, tags, slug } = ogImageSchema.parse({
            title: searchParams.get('title'),
            subTitle: searchParams.get('subTitle'),
            tags: searchParams.getAll('tags'),
            slug: searchParams.get('slug'),
        });

        return new ImageResponse(<OgImage title={title} subTitle={subTitle} tags={tags} slug={slug} />, {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'JetBrainMono',
                    data: fontBold,
                    style: 'normal',
                },
            ],
        });
    } catch (error) {
        return new Response(`Failed to generate image`, {
            status: 500,
        });
    }
}
