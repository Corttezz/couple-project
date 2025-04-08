import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const { jwt, user_id, url_identifier } = await request.json();

    if (!jwt || !user_id || !url_identifier) {
      return new NextResponse(
        JSON.stringify({ error: 'Todos os campos são obrigatórios: jwt, user_id, url_identifier' }),
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        INSERT INTO pages (user_id, jwt, url_identifier, created_at, update_at)
        VALUES ($1, $2, $3, DEFAULT, DEFAULT)
        RETURNING *;
      `;
      const values = [user_id, jwt, url_identifier];

      const result = await client.query(queryText, values);

      await client.query('COMMIT');

      return new NextResponse(
        JSON.stringify({ message: 'Page criada com sucesso', data: result.rows[0] }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao criar página:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Erro ao criar página' }),
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao processar requisição' }),
      { status: 500 }
    );
  }
} 