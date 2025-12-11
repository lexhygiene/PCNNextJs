import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'Set' : 'Missing',
        smtpHost: process.env.SMTP_HOST ? 'Set' : 'Missing',
        smtpUser: process.env.SMTP_USER ? 'Set' : 'Missing',
        recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY ? 'Set' : 'Missing',
        recaptchaSite: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? 'Set' : 'Missing',
        nodeEnv: process.env.NODE_ENV
    });
}
