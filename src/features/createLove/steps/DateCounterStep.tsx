import { useTranslations } from 'next-intl';
import { DateCounterData } from '../types';

export const DateCounterStep = ({ 
  value = { date: null, textType: '' },
  onChange, 
  onNext,
  onPrev
}: { 
  value: DateCounterData; 
  onChange: (value: DateCounterData) => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const t = useTranslations('CreateLove.form');
  const dateT = useTranslations('CreateLove.dateTexts');
  
  const dateTexts = [
    { id: 'love_since', text: dateT('love_since') },
    { id: 'together_since', text: dateT('together_since') },
    { id: 'dating_since', text: dateT('dating_since') },
    { id: 'married_since', text: dateT('married_since') },
    { id: 'friends_since', text: dateT('friends_since') },
    { id: 'first_kiss', text: dateT('first_kiss') },
    { id: 'first_date', text: dateT('first_date') }
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    onChange({
      ...value,
      date: dateStr ? new Date(dateStr) : null
    });
  };

  const handleTextChange = (textType: string) => {
    onChange({
      ...value,
      textType
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">{t('step3_title')}</h2>
        <p className="text-muted-foreground mb-4">{t('step3_description')}</p>
        
        <div className="space-y-4">
          {/* Seleção do texto */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Escolha uma frase
            </label>
            <div className="grid grid-cols-1 gap-2">
              {dateTexts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTextChange(item.id)}
                  className={`p-3 rounded-md text-left transition-colors ${
                    value.textType === item.id
                      ? 'bg-primary/20 border-primary'
                      : 'bg-card border-input hover:bg-primary/10'
                  } border`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          {/* Seleção da data */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Selecione a data
            </label>
            <input
              type="date"
              value={value.date ? value.date.toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
              className="w-full p-3 border border-input rounded-md"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
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
          disabled={!value.date || !value.textType}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
        >
          {t('next_button')}
        </button>
      </div>
    </div>
  );
}; 