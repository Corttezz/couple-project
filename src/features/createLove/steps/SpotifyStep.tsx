'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import type { FormData } from '../CreateLoveForm';

export const SpotifyStep = ({ 
  value, 
  onChange,
  onPrev,
  formData
}: { 
  value: string; 
  onChange: (value: string) => void;
  onPrev: () => void;
  formData: FormData; // Certifique-se que o tipo FormData está sendo importado corretamente
}) => {
  const t = useTranslations('CreateLove.form');
  const router = useRouter();
  const params = useParams();
  
  // Validar o link do Spotify (formato básico)
  const isValidSpotifyLink = (link: string) => {
    return link.trim() === '' || 
           link.includes('spotify.com/track/') || 
           link.includes('spotify.com/album/') || 
           link.includes('spotify.com/playlist/');
  };

  const onSubmit = () => {
    if (!formData) return;

    // Converter as fotos em URLs temporárias
    const photoUrls = formData.photos?.map(photo => URL.createObjectURL(photo)) || [];
    
    // Criar um objeto com os dados formatados
    const pageData = {
      pageTitle: formData.pageTitle,
      startDate: {
        date: formData.startDate.date?.toISOString(),
        textType: formData.startDate.textType
      },
      message: formData.message,
      photos: photoUrls,
      spotifyUrl: formData.spotifyLink,
      backgroundEffect: formData.backgroundEffect
    };
    
    console.log('Salvando dados com efeito:', pageData.backgroundEffect); // Debug
    localStorage.setItem(formData.pageName, JSON.stringify(pageData));
    
    const locale = params?.locale || 'en';
    router.push(`/${locale}/${formData.pageName}`);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">{t('step6_title')}</h2>
        <p className="text-muted-foreground mb-4">{t('step6_description')}</p>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {t('spotify_label')}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t('spotify_placeholder')}
            className={`w-full p-3 border rounded-md ${
              !isValidSpotifyLink(value) ? 'border-destructive' : 'border-input'
            }`}
          />
          {!isValidSpotifyLink(value) && (
            <p className="text-xs text-destructive">
              {t('spotify_error')}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {t('spotify_helper')}
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
          onClick={onSubmit}
          disabled={!isValidSpotifyLink(value)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
        >
          {t('create_page_button')}
        </button>
      </div>
    </div>
  );
}; 