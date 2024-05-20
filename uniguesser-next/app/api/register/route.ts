// pages/api/register.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/client';  

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json();
        const client = createClient();

        const { data, error } = await client.from('users').insert([{ username }]).select();

        if (error) {
            console.error('Database insertion error:', error);
            if (error.code === '23505') {
              
                return new Response(JSON.stringify({ error: "Username already exists. Please choose another." }), { status: 409, headers: { 'Content-Type': 'application/json' } });
            }
            return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error: any) {
        console.error('Request handling error:', error);
        return new Response(JSON.stringify({ error: error.message || "Server error processing the request" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
