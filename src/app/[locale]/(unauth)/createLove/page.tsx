import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { CreateLoveForm } from '@/features/createLove/CreateLoveForm';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AllLocales } from '@/utils/AppConfig';
// Importe outros componentes que você precisará

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

const CreateLovePage = ({ params }: { params: { locale: string } }) => {
  // Habilita a renderização estática com next-intl
  unstable_setRequestLocale(params.locale);

  // Use o namespace adequado ou crie um novo nos arquivos de tradução
  const t = useTranslations('CreateLove');

  return (
    <>
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-4xl font-bold">{t('title')}</h1>
          <p className="mb-10 max-w-3xl text-lg text-muted-foreground">{t('description')}</p>

          <CreateLoveForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateLovePage;
