import { NextResponse } from 'next/server';
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await client.fetch(POSTS_QUERY);
        return NextResponse.json({ posts });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
