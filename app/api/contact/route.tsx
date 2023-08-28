import { NextRequest, NextResponse } from 'next/server';
import Email from '@/components/contact/email';
import { smtpEmail, transporter } from '@/lib/nodemailer';
import { render } from '@react-email/components';
import * as z from 'zod';

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const { name, email, message } = body;

    const emailHtml = render(<Email name={name} email={email} message={message} />);

    const options = {
        from: smtpEmail,
        to: smtpEmail,
        subject: 'New Form Submission',
        html: emailHtml,
    };

    try {
        // Send email using the transporter
        const response = await transporter.sendMail(options);
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error('Failed to send email:', error);
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }

        return new Response(null, { status: 500 });
    }
}
