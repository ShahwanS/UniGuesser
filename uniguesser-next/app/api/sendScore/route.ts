import { createClient } from '@/app/utils/client';  
import { NextRequest } from 'next/server';


// takes the username searches for it in the database and updates the final score 
export async function POST(request: NextRequest) {
    try {
        const { userID, username, score } = await request.json();
        const client = createClient();

        const { data, error } = await client.from('users').update({ score }).match({ id: userID }).match({ username }).select();

        if (error) {
            console.error('Database insertion error:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error: any) {
        console.error('Request handling error:', error);
        return new Response(JSON.stringify({ error: error.message || "Server error processing the request" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}