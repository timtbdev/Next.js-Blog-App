import { postViewSchema } from "@/lib/validations";
import * as z from "zod";
import { kv } from "@vercel/kv";

export async function POST(
  req: Request,
  context: z.infer<typeof postViewSchema>
) {
  try {
    // Validate the route params.
    const { params } = postViewSchema.parse(context);
    const ip =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    //ßconst ip = req.ip;
    //const ip = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (ip) {
      // Hash the IP in order to not store it directly in your db.
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(ip)
      );
      const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // deduplicate the ip for each slug
      const isNew = await kv.set(
        ["deduplicate", hash, params.slug].join(":"),
        true,
        {
          nx: true,
          ex: 24 * 60 * 60,
        }
      );

      if (!isNew) {
        return new Response(null, { status: 202 });
      }
    }
    await kv.incr(["pageviews", "posts", params.slug].join(":"));
    return new Response(null, { status: 202 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function GET(
  req: Request,
  context: z.infer<typeof postViewSchema>
) {
  try {
    // Validate the route params.
    const { params } = postViewSchema.parse(context);

    const views =
      (await kv.get<number>(["pageviews", "posts", params.slug].join(":"))) ??
      0;

    return new Response(JSON.stringify(views));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
