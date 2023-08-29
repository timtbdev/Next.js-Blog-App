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
        const { title, image, author_name, author_image, author_title } = ogImagePostSchema.parse({
            title: searchParams.get('title'),
            image: searchParams.get('image'),
            author_name: searchParams.get('author_name'),
            author_image: searchParams.get('author_image'),
            author_title: searchParams.get('author_title'),
        });

        return new ImageResponse(
            (
                <OgImage
                    title={title}
                    image={image}
                    author_name={author_name}
                    author_image={author_image}
                    author_title={author_title}
                />
            ),
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
