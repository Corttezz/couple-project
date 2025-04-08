import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'ID do usuário não fornecido' }),
        { status: 400 }
      );
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'Usuário não encontrado no Clerk' }),
        { status: 404 }
      );
    }

    // Conectar ao banco de dados e inserir o usuário
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO "user" (
          id, email, email_verified, first_name, last_name, avatar_url, 
          login_provider, has_mfa, is_banned, is_locked, created_at, last_sign_in_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO NOTHING
      `;
      const values = [
        user.id,
        user.emailAddresses[0]?.emailAddress,
        user.emailAddresses[0]?.verification?.status === 'verified',
        user.firstName,
        user.lastName,
        user.imageUrl,
        user.externalAccounts[0]?.provider || (user.passwordEnabled ? 'password' : 'unknown'),
        user.twoFactorEnabled || user.totpEnabled,
        user.banned,
        user.locked,
        new Date(user.createdAt),
        user.lastSignInAt ? new Date(user.lastSignInAt) : null
      ];

      await client.query(query, values);

      return new NextResponse(
        JSON.stringify({ message: 'Usuário criado com sucesso' }),
        { status: 201 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao criar usuário' }),
      { status: 500 }
    );
  }
}