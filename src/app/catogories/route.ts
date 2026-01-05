import { NextResponse } from "next/server";
export const dynamic = 'force-static';

// Making sense of caching 
export async function GET() {
    // This data typically comes from a database or an API adn it does not need to be refreshed on every request.so we can cache it.
    const categories= [
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Books' },
            { id: 3, name: 'Clothing' },
            { id: 4, name: 'Home & Kitchen' },
        ];
        return  NextResponse.json(categories)
    }