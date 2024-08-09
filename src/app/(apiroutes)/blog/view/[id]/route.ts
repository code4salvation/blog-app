import { NextResponse } from "next/server";
import blogs from "../../../_data/blogs.json";

export async function GET({ params }) {
    const id = params.id;
    const blogData = blogs.posts.filter((item) => item.id === Number(id));
    return NextResponse.json({ blog: blogData[0] });
}