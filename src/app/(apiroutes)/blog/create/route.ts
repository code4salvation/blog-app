import { NextResponse } from "next/server";
import { Pool } from 'pg';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
    try {
        if (!request.body) {
            throw new Error('Bad Request : request body is missing');
        }
        
        const pool = new Pool({
            connectionString: process.env.POSTGRES_URL,
        });
        const client = await pool.connect();
        const body = await request.json();
        const maxId = await client.query(`SELECT MAX(id) FROM blogs;`)

        const insertQuery = `
      INSERT INTO blogs (id, title, body, publishedDate, author, tags, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

        await client.query(insertQuery, [
            maxId.rows[0].max + 1,
            body.title,
            body.content,
            body.date,
            body.author,
            JSON.stringify(body.tags),
            body.image
        ]);
        client.release(); 
        return NextResponse.json({ success: true, message: `Post created successfully` }, { status: 200 });
    } catch (error) {
        console.error('Error creating post', error);
        return NextResponse.json({ success: false, message: 'Error creating post' }, { status: 500 });
    }
}