import { NextRequest, NextResponse } from "next/server"; 
import { comments } from "./data";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const filteredComments = query
        ? comments.filter(comment => comment.text.includes(query))
        : comments;
    return NextResponse.json(filteredComments);
}

// use url query parameters to add powerful features to your application like searching sorting and pagination

export async function POST(request: Request) {
    const comment = await request.json();
    
    const NewComment = {
        id: comments.length + 1,
        text: comment.text
    };
    
    comments.push(NewComment);

    // This does the exact same thing but is cleaner
    return NextResponse.json(NewComment, { status: 201 });
}