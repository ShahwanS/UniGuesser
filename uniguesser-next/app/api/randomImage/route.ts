

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/app/utils/client";

export async function GET(request: NextRequest) {
    const client = createClient();
    try {
        const { data, error } = await client.from("random_image").select("*");

        if (error) {
            console.error('Error fetching image:', error);
            return new NextResponse(JSON.stringify({error: 'Error fetching image', details: error.message}), {
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
        //return a random index  1 to 16
        const randomIndex = Math.floor(Math.random() * 2) + 1;
        console.log(randomIndex)
        const randomObject = data[randomIndex];
        console.log(randomObject)
        return new NextResponse(JSON.stringify(randomObject), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
            }
        });
    } catch (exception) {
        console.error('Exception in GET API:', exception);
        return new NextResponse(JSON.stringify({error: 'Server error', details: (exception as Error).message}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
            }
        });
    }
}
