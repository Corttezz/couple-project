import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlIdentifier = searchParams.get('url_identifier');

  if (!urlIdentifier) {
    return new NextResponse(
      JSON.stringify({ error: 'O parâmetro url_identifier é obrigatório' }),
      { status: 400 }
    );
  }

  try {
    const client = await pool.connect();
    try {
      const queryText = 'SELECT * FROM pages WHERE url_identifier = $1';
      const values = [urlIdentifier];

      const result = await client.query(queryText, values);

      if (result.rows.length === 0) {
        return new NextResponse(
          JSON.stringify({ error: 'Página não encontrada' }),
          { status: 404 }
        );
      }

      return new NextResponse(
        JSON.stringify({ data: result.rows[0] }),
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
    console.error('Erro ao buscar página:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao buscar página' }),
      { status: 500 }
    );
  }
}
