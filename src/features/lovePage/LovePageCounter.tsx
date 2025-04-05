'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function LovePageCounter({ startDate }: { startDate: string }) {
  const t = useTranslations('LovePage');
  const [days, setDays] = useState(0);

  useEffect(() => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, [startDate]);

  return (
    <div className="text-center space-y-4">
      <div className="inline-block px-8 py-4 rounded-2xl bg-primary/5 backdrop-blur-sm">
        <span className="text-6xl md:text-8xl font-bold text-primary">
          {days}
        </span>
        <span className="block text-xl text-gray-600 mt-2">
          {t('days')}
        </span>
      </div>
    </div>
  );
} 