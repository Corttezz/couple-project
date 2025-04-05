import { useTranslations } from 'next-intl';

export const PageNameStep = ({ 
  value, 
  onChange, 
  onNext 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  onNext: () => void;
}) => {
  const t = useTranslations('CreateLove.form');
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">{t('step1_title')}</h2>
        <p className="text-muted-foreground mb-4">{t('step1_description')}</p>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {t('page_name_label')}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t('page_name_placeholder')}
            className="w-full p-3 border border-input rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            {t('page_name_helper')}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
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