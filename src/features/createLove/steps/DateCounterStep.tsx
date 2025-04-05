import { useTranslations } from 'next-intl';

export const DateCounterStep = ({ 
  value, 
  onChange, 
  onNext,
  onPrev
}: { 
  value: Date | null; 
  onChange: (value: Date | null) => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const t = useTranslations('CreateLove.form');
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (dateStr) {
      onChange(new Date(dateStr));
    } else {
      onChange(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">{t('step3_title')}</h2>
        <p className="text-muted-foreground mb-4">{t('step3_description')}</p>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {t('date_counter_label')}
          </label>
          <input
            type="date"
            value={value ? value.toISOString().split('T')[0] : ''}
            onChange={handleDateChange}
            className="w-full p-3 border border-input rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            {t('date_counter_helper')}
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
          disabled={!value}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
        >
          {t('next_button')}
        </button>
      </div>
    </div>
  );
}; 