import { NextRequest } from "next/server";
import { createClient } from "@/app/utils/client";
import { request } from "http";

//this takes a user and inserts it into the database


export async function POST(request: NextRequest){
    const {username} = await request?.json();
    const client = createClient();
    const {data, error} = await client.from("users").insert([{username}]);
    if (error) {
        return new Response(error.message, {status: 500});
    }
    return new Response(JSON.stringify(data), {status: 200});

}
