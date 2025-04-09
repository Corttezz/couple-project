import { SignIn } from '@clerk/nextjs';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { AllLocales } from '@/utils/AppConfig';
import { getI18nPath } from '@/utils/Helpers';

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignInPage = (props: { params: { locale: string } }) => {
  // Habilita a renderização estática com next-intl
  unstable_setRequestLocale(props.params.locale);

  return <SignIn path={getI18nPath('/sign-in', props.params.locale)} />;
};

export default SignInPage;
