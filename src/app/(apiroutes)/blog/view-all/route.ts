import { NextResponse } from "next/server";
import blogs from "../../_data/blogs.json";

export async function GET() {
    return NextResponse.json({ blogs: blogs.posts });
}