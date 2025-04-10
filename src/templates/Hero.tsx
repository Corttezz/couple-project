import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import { badgeVariants } from '@/components/ui/badgeVariants';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <Section className="py-32">
      <CenteredHero
        banner={(
          <a
            className={badgeVariants()}
            href="https://www.instagram.com/withloove"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogoIcon className="mr-1 size-5" />
            {' '}
            {t('follow_instagram')}
          </a>
        )}
        title={t.rich('title', {
          important: chunks => (
            <span className="bg-gradient-to-r from-[#ad2568] via-[#cf5a90] to-[#ffcfcb] bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
        description={t('description')}
        buttons={(
          <>
            <a
              className={buttonVariants({ size: 'lg' })}
              href="/createLove"
            >
              {t('primary_button')}
            </a>

            {/* <a
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="https://github.com/ixartz/SaaS-Boilerplate"
            >
              <GitHubLogoIcon className="mr-2 size-5" />
              {t('secondary_button')}
            </a> */}
          </>
        )}
      />
    </Section>
  );
};
