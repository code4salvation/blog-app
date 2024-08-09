import path from "path";
import fs from 'fs';
import { NextResponse } from "next/server";
import blogs from "../../_data/blogs.json";
export async function POST(request: Request) {
    try {
            if (!request.body) {
                throw new Error('Bad Request : request body is missing');
            }
            const body = await request.json();
            const filePath = path.join(process.cwd(), '..', '..', '_data', 'blogs.json');
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            }
            fs.writeFileSync(filePath, JSON.stringify({ posts : [...blogs.posts, {id: blogs.posts.length+1, ...body} ]}));
            return NextResponse.json({ success: true, message: 'Data written to file' });
        } catch (error) {
            console.error('Error writing to file:', error);
            return NextResponse.json({ success: false, message: 'Error writing to file' }, { status: 500 });
        }
}