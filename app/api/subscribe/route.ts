import * as z from 'zod';
import { emailSchema } from '@/lib/validation/contact';

const FORM_ID = process.env.CONVERTKIT_FORM_ID;
const API_KEY = process.env.CONVERTKIT_API_KEY;
const API_URL = process.env.CONVERTKIT_API_URL;

export async function POST(req: Request, res: Response) {
    try {
        // Get the request body and validate it.
        const json = await req.json();
        const body = emailSchema.parse(json);
        const email = body.email;

        //what do we want to send to CK?
        const data = { email, api_key: API_KEY };

        // Update the post.
        // TODO: Implement sanitization for content.
        // ship it :)
        const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        });

        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }

        return new Response(null, { status: 500 });
    }
}
