import { useTranslations } from 'next-intl';

import { Navbar } from '@/templates/Navbar';
import { Footer } from '@/templates/Footer'; 
import { Section } from '@/features/landing/Section';
import { CreateLoveForm } from '@/features/createLove/CreateLoveForm';
// Importe outros componentes que você precisará

const CreateLovePage = () => {
  // Use o namespace adequado ou crie um novo nos arquivos de tradução
  const t = useTranslations('CreateLove');

  return (
    <>
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-3xl">{t('description')}</p>
          
          <CreateLoveForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateLovePage;
