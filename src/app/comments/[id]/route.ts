import { NextResponse } from "next/server";
import { comments } from "../data";

export async function GET(request: Request, { params }: { params: Promise<{id: string}> }) {
    const { id } = await params;
    const comment = comments.find(c => c.id === parseInt(id));
    return NextResponse.json(comment || null);
}

export async function PATCH(request:Request , { params }: { params: Promise<{id: string}> }) {
    const { id } = await params;
    const body = await request.json();
    const { text } = body;

    const index = comments.findIndex(comment => comment.id === parseInt(id));
    comments[index].text = text;

    return NextResponse.json(comments[index]);
}

export async function DELETE(request: Request, { params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const index = comments.findIndex((c) => c.id === parseInt(id));

  const deletedComment = comments[index];
  comments.splice(index, 1); // Remove from array
  
  return Response.json(deletedComment);
}