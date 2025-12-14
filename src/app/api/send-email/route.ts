import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from 'next-sanity';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-03-20',
    useCdn: false,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, heardAbout, description, token } = body;

        // 1. Verify Recaptcha
        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        });
        const verifyJson = await verifyRes.json();

        if (!verifyJson.success) {
            return NextResponse.json({ success: false, message: 'Recaptcha verification failed' }, { status: 400 });
        }

        // 2. Save to Sanity (New Step)
        try {
            await client.create({
                _type: 'lead',
                name,
                email,
                phone,
                heardAbout,
                description,
                status: 'new',
            });
            console.log('Lead saved to Sanity');
        } catch (sanityError) {
            console.error('Failed to save to Sanity:', sanityError);
            // We verify recatcha first, if saving fails, we still want to try sending email?
            // Yes, let's proceed to email as a fallback notification.
        }

        // 3. Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 4. Send Email
        await transporter.sendMail({
            from: `"Website Lead" <${process.env.SMTP_USER}>`,
            to: 'info@pestcontrolnoida.in', // Your receiving email
            cc: 'lexhygiene2020@gmail.com', // CC to Lex Hygiene
            replyTo: email,
            subject: `New Quote Request from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Source: ${heardAbout}
Requirements:
${description}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #1A3C34; border-bottom: 2px solid #E07A5F; padding-bottom: 10px;">New Quote Request</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Heard About Us:</strong> ${heardAbout}</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <strong>Requirements:</strong><br/>
                        ${description.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true, message: 'Email sent successfully and saved to database' });

    } catch (error: any) {
        console.error('Email Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to send email',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
