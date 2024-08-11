import { NextResponse } from "next/server";
import { Pool } from 'pg';
export const dynamic = 'force-dynamic';
export async function PUT(request: Request) {
    try {
        if (!request.body) {
            throw new Error('Bad Request : request body is missing');
        }
        
        const pool = new Pool({
            connectionString: process.env.POSTGRES_URL,
        });
        const client = await pool.connect();
        const body = await request.json();
        if (!body.id || !body.title || !body.content || !body.date || !body.author || !body.tags || !body.image) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
          }
      
          const query = `
            UPDATE blogs
            SET title = $1,
                body = $2,
                publishedDate = $3,
                author = $4,
                tags = $5,
                image = $6
            WHERE id = $7
          `;
      
        const values = [body.title, body.content, body.date, body.author, JSON.stringify(body.tags), body.image, body.id];
      
        const result = await pool.query(query, values);
        client.release(); 
        return NextResponse.json({ success: true, message: `Post updated successfully` }, { status: 200 });
    } catch (error) {
        console.error('Error creating post', error);
        return NextResponse.json({ success: false, message: 'Error creating post' }, { status: 500 });
    }
}