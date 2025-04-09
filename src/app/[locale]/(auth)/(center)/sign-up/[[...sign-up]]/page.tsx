import { SignUp } from '@clerk/nextjs';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { AllLocales } from '@/utils/AppConfig';
import { getI18nPath } from '@/utils/Helpers';

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignUpPage = (props: { params: { locale: string } }) => {
  // Habilita a renderização estática com next-intl
  unstable_setRequestLocale(props.params.locale);

  return <SignUp path={getI18nPath('/sign-up', props.params.locale)} />;
};

export default SignUpPage;
