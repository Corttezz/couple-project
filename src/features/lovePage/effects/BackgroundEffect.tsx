import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importar apenas o componente Hearts de forma tradicional
import { Hearts } from './Hearts';

// Importar os outros componentes dinamicamente
const Stars = dynamic(() => import('./Stars').then(mod => ({ default: mod.Stars })), {
  suspense: true,
  loading: () => <Hearts />
});

const Bubbles = dynamic(() => import('./Bubbles').then(mod => ({ default: mod.Bubbles })), {
  suspense: true,
  loading: () => <Hearts />
});

const Confetti = dynamic(() => import('./Confetti').then(mod => ({ default: mod.Confetti })), {
  suspense: true,
  loading: () => <Hearts />
});

const Fireflies = dynamic(() => import('./Fireflies').then(mod => ({ default: mod.Fireflies })), {
  suspense: true,
  loading: () => <Hearts />
});

type BackgroundEffectProps = {
  effect: string;
};

export function BackgroundEffect({ effect }: BackgroundEffectProps) {
  // Renderizar o componente com base no efeito
  const renderEffect = () => {
    switch (effect) {
      case 'stars':
        return <Stars />;
      case 'hearts':
        return <Hearts />;
      case 'bubbles':
        return <Bubbles />;
      case 'confetti':
        return <Confetti />;
      case 'fireflies':
        return <Fireflies />;
      default:
        return <Hearts />;
    }
  };

  return (
    <Suspense fallback={<Hearts />}>
      <div style={{ isolation: 'isolate' }} className="w-full h-full overflow-hidden">
        {renderEffect()}
      </div>
    </Suspense>
  );
} 