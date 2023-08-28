import { OgImage } from '@/components/og/og-image-post';
import { ogImagePostSchema } from '@/lib/validations';
import { ImageResponse } from 'next/server';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const runtime = 'edge';

const interBold = fetch(new URL('../../../public/fonts/Inter-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer()
);

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(`${req.url}`);
        const fontBold = await interBold;
        console.log('Route API Year', searchParams.get('year'));
        const { title, year, image, name, avatar, job } = ogImagePostSchema.parse({
            title: searchParams.get('title'),
            year: searchParams.get('year'),
            image: searchParams.get('image'),
            name: searchParams.get('name'),
            avatar: searchParams.get('avatar'),
            job: searchParams.get('job'),
        });

        return new ImageResponse(
            <OgImage title={title} year={year} image={image} name={name} avatar={avatar} job={job} />,
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Inter',
                        data: fontBold,
                        weight: 700,
                        style: 'normal',
                    },
                ],
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(`Failed to generate image`, {
            status: 500,
        });
    }
}
