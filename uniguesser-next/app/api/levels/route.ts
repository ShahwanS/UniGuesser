

import {NextResponse } from 'next/server';
import { createClient } from "@/app/utils/client";

export async function GET() {
    const client = createClient();
    try {
        const { data, error } = await client.from("images").select("*");

        if (error) {
            console.error('Error fetching images:', error);
            return new NextResponse(JSON.stringify({ error: 'Error fetching images', details: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                }
            });
        }
        if (!data) {
            return new NextResponse(JSON.stringify({error: 'No image found'}), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                }
            });
        }
       
        return new NextResponse(JSON.stringify({ images: data }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
            }
        });
    } catch (exception) {
        console.error('Exception in GET API:', exception);
        return new NextResponse(JSON.stringify({ error: 'Server error', details: (exception as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
            }
        });
    }
}