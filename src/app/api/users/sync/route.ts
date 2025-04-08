import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Função para converter timestamp do Clerk para formato PostgreSQL
function convertTimestampToPostgres(timestamp: number | null): string | null {
  if (!timestamp) return null;
  return new Date(timestamp).toISOString();
}

export async function POST() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Não autorizado' }),
        { status: 401 }
      );
    }

    // Buscar todos os usuários do Clerk
    const response = await clerkClient().users.getUserList();
    const users = response.data;

    const clerkUserIds = users.map(user => user.id);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (const clerkUser of users) {
        const userData = {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          email_verified: clerkUser.emailAddresses[0]?.verification?.status === 'verified',
          first_name: clerkUser.firstName,
          last_name: clerkUser.lastName,
          avatar_url: clerkUser.imageUrl,
          login_provider: clerkUser.externalAccounts[0]?.provider || (clerkUser.passwordEnabled ? 'password' : 'unknown'),
          has_mfa: clerkUser.twoFactorEnabled || clerkUser.totpEnabled,
          is_banned: clerkUser.banned,
          is_locked: clerkUser.locked,
          last_sign_in_at: convertTimestampToPostgres(clerkUser.lastSignInAt),
          is_first_login: clerkUser.id === userId ? false : true
        };

        await client.query(
          `INSERT INTO "user" (
            id, email, email_verified, first_name, last_name, 
            avatar_url, login_provider, has_mfa, is_banned, 
            is_locked, last_sign_in_at, is_first_login
          ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            email_verified = EXCLUDED.email_verified,
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            avatar_url = EXCLUDED.avatar_url,
            login_provider = EXCLUDED.login_provider,
            has_mfa = EXCLUDED.has_mfa,
            is_banned = EXCLUDED.is_banned,
            is_locked = EXCLUDED.is_locked,
            last_sign_in_at = EXCLUDED.last_sign_in_at,
            is_first_login = EXCLUDED.is_first_login`,
          [
            userData.id,
            userData.email,
            userData.email_verified,
            userData.first_name,
            userData.last_name,
            userData.avatar_url,
            userData.login_provider,
            userData.has_mfa,
            userData.is_banned,
            userData.is_locked,
            userData.last_sign_in_at,
            userData.is_first_login
          ]
        );
      }

      // Remover usuários que não estão mais no Clerk
      await client.query(
        `DELETE FROM "user" WHERE id NOT IN (${clerkUserIds.map(id => `'${id}'`).join(', ')})`
      );

      await client.query('COMMIT');

      return new NextResponse(
        JSON.stringify({ 
          message: 'Usuários sincronizados com sucesso'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro ao sincronizar usuários:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao sincronizar usuários' }),
      { status: 500 }
    );
  }
} 