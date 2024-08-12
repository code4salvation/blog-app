import { NextResponse } from "next/server";
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        const client = await pool.connect();
        const results = await client.query(`SELECT * FROM blogs ORDER BY id`);
        client.release(); 
        return NextResponse.json(results.rows, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}