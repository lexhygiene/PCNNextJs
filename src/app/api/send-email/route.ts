import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

        // 2. Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 3. Send Email
        await transporter.sendMail({
            from: `"Website Lead" <${process.env.SMTP_USER}>`,
            to: 'info@pestcontrolnoida.in', // Your receiving email
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

        return NextResponse.json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Email Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }
}
