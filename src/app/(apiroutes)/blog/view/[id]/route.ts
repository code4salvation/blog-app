import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
export const dynamic = 'force-dynamic';
export async function GET(_request: Request, { params }) {
  try {
    const client = await pool.connect();
    const id = params?.id;
    const results = await client.query('SELECT * FROM blogs WHERE id = $1', [id]);
    client.release(); 
    return NextResponse.json(results.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}