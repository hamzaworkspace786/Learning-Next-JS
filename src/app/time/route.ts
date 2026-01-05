import { NextResponse } from "next/server";
export const dynamic = 'force-static';
export const revalidate = 10; // Revalidate the data every 10 seconds


// Caching only works with GET methods
export async function GET()
{
    return NextResponse.json({time : new Date().toLocaleTimeString()})
    // Each reload will give you new time because there is no caching by default 
}