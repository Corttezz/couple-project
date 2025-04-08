import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// /api/users/{id}

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const userId = pathname.split('/').pop();

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: 'ID do usuário não fornecido' }),
      { status: 400 }
    );
  }

  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM "user" WHERE id = $1', [userId]);

      if (result.rows.length === 0) {
        return new NextResponse(
          JSON.stringify({ error: 'Usuário não encontrado' }),
          { status: 404 }
        );
      }

      return new NextResponse(
        JSON.stringify(result.rows[0]),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao buscar usuário' }),
      { status: 500 }
    );
  }
}
