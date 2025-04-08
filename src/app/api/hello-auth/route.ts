import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = auth();
  
  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: 'Não autorizado' }),
      { status: 401 }
    );
  }

  return new NextResponse(
    JSON.stringify({ 
      message: 'Olá usuário autenticado!',
      userId: userId 
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
} 