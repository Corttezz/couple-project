import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { User } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Não autorizado' }),
        { status: 401 }
      );
    }

    // Listar todos os usuários
    const response = await clerkClient.users.getUserList();
    const users = response.data;
    
    // Mapear apenas as informações necessárias
    const usersList = users.map((user: User) => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      emailVerified: user.emailAddresses[0]?.verification?.status === 'verified',
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.imageUrl,
      loginProvider: user.externalAccounts[0]?.provider || (user.passwordEnabled ? 'password' : 'unknown'),
      hasMFA: user.twoFactorEnabled || user.totpEnabled,
      isBanned: user.banned,
      isLocked: user.locked,
      createdAt: user.createdAt,
      lastSignInAt: user.lastSignInAt,
    }));
    

    return new NextResponse(
      JSON.stringify({ 
        users: usersList,
        total: users.length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao buscar usuários' }),
      { status: 500 }
    );
  }
} 