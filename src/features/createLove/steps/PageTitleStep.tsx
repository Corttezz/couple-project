import { useTranslations } from 'next-intl';

export const PageTitleStep = ({ 
  value, 
  onChange, 
  onNext,
  onPrev
}: { 
  value: string; 
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const t = useTranslations('CreateLove.form');
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">{t('step2_title')}</h2>
        <p className="text-muted-foreground mb-4">{t('step2_description')}</p>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {t('page_title_label')}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t('page_title_placeholder')}
            className="w-full p-3 border border-input rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            {t('page_title_helper')}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="border border-input px-4 py-2 rounded-md"
        >
          {t('prev_button')}
        </button>
        <button
          onClick={onNext}
          disabled={!value.trim()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
        >
          {t('next_button')}
        </button>
      </div>
    </div>
  );
}; 