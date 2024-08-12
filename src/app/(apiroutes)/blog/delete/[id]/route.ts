import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
export const dynamic = 'force-dynamic';
export async function DELETE(_request: Request, { params }) {
    try{
    const id = params?.id;
    const client = await pool.connect();
    const results = await client.query('DELETE FROM blogs WHERE id = $1', [id]);
    client.release();
    return NextResponse.json({ success: true,  message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true, message: error }, { status: 500 });
  } 
}