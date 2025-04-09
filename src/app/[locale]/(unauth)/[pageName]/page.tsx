import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import { LovePageClient } from '@/features/lovePage/LovePageClient';
import { AllLocales } from '@/utils/AppConfig';

// Gerar versões estáticas para todos os idiomas
export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

// Metadata no servidor
export async function generateMetadata({ params }: { params: { pageName: string; locale: string } }): Promise<Metadata> {
  return {
    title: `Love Page | ${params.pageName}`,
    description: 'Uma página especial de memórias',
  };
}

// Página do servidor que renderiza o componente cliente
export default function LovePage({ params }: { params: { pageName: string; locale: string } }) {
  // Habilita a renderização estática com next-intl
  unstable_setRequestLocale(params.locale);

  return <LovePageClient params={params} />;
}
