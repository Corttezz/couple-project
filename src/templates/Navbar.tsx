import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <div className="bg-secondary">
      <Section className="px-3 py-6">
        <CenteredMenu
          logo={<Logo />}
          rightMenu={(
            <>
              {/* PRO: Dark mode toggle button */}
              <li data-fade>
                <LocaleSwitcher />
              </li>
              <li className="ml-1 mr-2.5" data-fade>
                <Link href="/sign-in">{t('sign_in')}</Link>
              </li>
              <li>
                <Link className={buttonVariants()} href="/sign-up">
                  {t('sign_up')}
                </Link>
              </li>
            </>
          )}
        >
          <li>
            <Link href="/sign-up">{t('product')}</Link>
          </li>

          <li>
            <Link href="/sign-up">{t('docs')}</Link>
          </li>

          <li>
            <Link href="/sign-up">{t('blog')}</Link>
          </li>

          <li>
            <Link href="/sign-up">{t('community')}</Link>
          </li>

          <li>
            <Link href="/sign-up">{t('company')}</Link>
          </li>
        </CenteredMenu>
      </Section>
      <div
        className="h-20"
        style={{
          background: 'linear-gradient(to bottom, #ffcfcb 0%, white 100%)',
        }}
      >
      </div>
    </div>
  );
};
