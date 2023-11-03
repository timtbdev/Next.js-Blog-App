import { SharedOgImage } from "@/components/shared";
import { ogImageSchema } from "@/lib/validation/og";
import { ImageResponse } from "next/og";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const runtime = "edge";

const interBold = fetch(
  new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(`${req.url}`);
    const fontBold = await interBold;

    const { title, subTitle, tags, slug } = ogImageSchema.parse({
      title: searchParams.get("title"),
      subTitle: searchParams.get("subTitle"),
      tags: searchParams.getAll("tags"),
      slug: searchParams.get("slug"),
    });

    return new ImageResponse(
      (
        <SharedOgImage
          title={title}
          subTitle={subTitle}
          tags={tags}
          slug={slug}
        />
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      },
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
