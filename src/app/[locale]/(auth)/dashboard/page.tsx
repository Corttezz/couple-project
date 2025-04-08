"use client";

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getDecodedToken } from '@/utils/decodeToken';

import { MessageState } from '@/features/dashboard/MessageState';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { SponsorLogos } from '@/features/sponsors/SponsorLogos';

const DashboardIndexPage = () => {
  const t = useTranslations('DashboardIndex');

  useEffect(() => {
    const decodedToken = getDecodedToken();

    if (!decodedToken) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${decodedToken.userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${decodedToken.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 404) {
          const createUserData = await fetch(`/api/users/create`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${decodedToken.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: decodedToken.userId }),
          });

          await createUserData.json();


          // request para sincronizar os dados do usuário 
          const syncUserData = await fetch(`/api/users/sync`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${decodedToken.token}`,
              'Content-Type': 'application/json',
            },
          });
          // eslint-disable-next-line no-unused-vars
          await syncUserData.json();

          return;
        }

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }
        // eslint-disable-next-line no-unused-vars
        await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <MessageState
        icon={(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M12 12v9M12 12L4 7.5" />
          </svg>
        )}
        title={t('message_state_title')}
        description={t.rich('message_state_description', {
          code: chunks => (
            <code className="bg-secondary text-secondary-foreground">
              {chunks}
            </code>
          ),
        })}
        button={(
          <>
            <div className="mt-2 text-xs font-light text-muted-foreground">
              {t.rich('message_state_alternative', {
                url: () => (
                  <a
                    className="text-blue-500 hover:text-blue-600"
                    href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
                  >
                    Next.js Boilerplate SaaS
                  </a>
                ),
              })}
            </div>

            <div className="mt-7">
              <SponsorLogos />
            </div>
          </>
        )}
      />
    </>
  );
};

export default DashboardIndexPage;
