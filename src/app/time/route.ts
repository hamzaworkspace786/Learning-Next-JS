import { NextResponse } from "next/server";

// Caching 
export async function GET()
{
    return NextResponse.json({time : new Date().toLocaleTimeString()})
    // Each reload will give you new time because there is no caching by default 
}