'use client';

import jwtEncode from 'jwt-encode';
import { useTranslations } from 'next-intl';

// import { jwtDecode } from 'jwt-decode';
import { getDecodedToken } from '@/utils/decodeToken';

// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
import type { FormData } from '../CreateLoveForm';

export const SpotifyStep = ({
  value,
  onChange,
  onPrev,
  formData,
}: {
  value: string;
  onChange: (value: string) => void;
  onPrev: () => void;
  formData: FormData; // Certifique-se que o tipo FormData está sendo importado corretamente
}) => {
  const t = useTranslations('CreateLove.form');
  // const router = useRouter();
  // const params = useParams();
  const decodedToken = getDecodedToken();
  // Validar o link do Spotify (formato básico)
  const isValidSpotifyLink = (link: string) => {
    return link.trim() === ''
      || link.includes('spotify.com/track/')
      || link.includes('spotify.com/album/')
      || link.includes('spotify.com/playlist/');
  };

  const onSubmit = async () => {
    if (!formData) {
      return;
    }

    // Converter as fotos em URLs temporárias
    const photoUrls = formData.photos?.map(photo => URL.createObjectURL(photo)) || [];

    // Criar um objeto com os dados formatados
    const pageData = {
      pageTitle: formData.pageTitle,
      startDate: {
        date: formData.startDate.date?.toISOString(),
        textType: formData.startDate.textType,
      },
      message: formData.message,
      photos: photoUrls,
      spotifyUrl: formData.spotifyLink,
      backgroundEffect: formData.backgroundEffect,
    };

    localStorage.setItem(formData.pageName, JSON.stringify(pageData));
    const jwt = jwtEncode(pageData, 'secret');
    const urlIdentifier = formData.pageName.replace(/ /g, '-');

    // const locale = params?.locale || 'en';
    // router.push(`/${locale}/${formData.pageName}`);

    const createPageData = await fetch(`/api/page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jwt,
        user_id: decodedToken?.userId,
        url_identifier: urlIdentifier,
      }),
    });

    await createPageData.json();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-2 text-xl font-bold">{t('step6_title')}</h2>
        <p className="mb-4 text-muted-foreground">{t('step6_description')}</p>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {t('spotify_label')}
          </label>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={t('spotify_placeholder')}
            className={`w-full rounded-md border p-3 ${
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

      <div className="mt-6 flex justify-between">
        <button
          onClick={onPrev}
          className="rounded-md border border-input px-4 py-2"
        >
          {t('prev_button')}
        </button>
        <button
          onClick={onSubmit}
          disabled={!isValidSpotifyLink(value)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {t('create_page_button')}
        </button>
      </div>
    </div>
  );
};
