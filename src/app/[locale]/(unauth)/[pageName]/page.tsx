import { Metadata } from 'next';
import { LovePageClient } from '@/features/lovePage/LovePageClient';

// Metadata no servidor
export async function generateMetadata({ params }: { params: { pageName: string } }): Promise<Metadata> {
  return {
    title: `Love Page | ${params.pageName}`,
    description: 'Uma página especial de memórias',
  };
}

// Página do servidor que renderiza o componente cliente
export default function LovePage({ params }: { params: { pageName: string } }) {
  return <LovePageClient params={params} />;
} 