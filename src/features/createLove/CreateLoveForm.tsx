'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LivePreview } from './LivePreview';
import { ProgressBar } from './ProgressBar';
import { BackgroundEffectStep } from './steps/BackgroundEffectStep';
import { DateCounterStep } from './steps/DateCounterStep';
import { MessageStep } from './steps/MessageStep';
import { PageNameStep } from './steps/PageNameStep';
import { PageTitleStep } from './steps/PageTitleStep';
import { PhotosStep } from './steps/PhotosStep';
import { SpotifyStep } from './steps/SpotifyStep';
import type { BackgroundEffect } from './types/backgroundEffects';

export type FormData = {
  pageName: string;
  pageTitle: string;
  startDate: {
    date: Date | null;
    textType: string;
  };
  message: string;
  photos: File[];
  backgroundEffect: BackgroundEffect;
  spotifyLink: string;
};

export const CreateLoveForm = () => {
  const t = useTranslations('CreateLove.form');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState<FormData>({
    pageName: '',
    pageTitle: '',
    startDate: {
      date: null,
      textType: '',
    },
    message: '',
    photos: [],
    backgroundEffect: 'hearts',
    spotifyLink: '',
  });

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PageNameStep
            value={formData.pageName}
            onChange={value => updateFormData('pageName', value)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <PageTitleStep
            value={formData.pageTitle}
            onChange={value => updateFormData('pageTitle', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <BackgroundEffectStep
            value={formData.backgroundEffect}
            onChange={value => updateFormData('backgroundEffect', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <PhotosStep
            value={formData.photos}
            onChange={value => updateFormData('photos', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        ); ;
      case 5:
        return (
          <MessageStep
            value={formData.message}
            onChange={value => updateFormData('message', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <DateCounterStep
            value={formData.startDate}
            onChange={value => updateFormData('startDate', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 7:
        return (
          <SpotifyStep
            value={formData.spotifyLink}
            onChange={value => updateFormData('spotifyLink', value)}
            formData={formData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2" style={{ isolation: 'isolate' }}>
      {/* Formulário à esquerda */}
      <div className="rounded-lg border border-border bg-card p-8" style={{ isolation: 'isolate' }}>
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          onStepClick={step => setCurrentStep(step)}
          stepTitles={[
            t('step1_title'),
            t('step2_title'),
            t('step7_title'),
            t('step3_title'),
            t('step4_title'),
            t('step5_title'),
            t('step6_title'),
          ]}
        />

        <div className="mt-10" style={{ isolation: 'isolate' }}>
          {renderStep()}
        </div>
      </div>

      {/* Preview à direita */}
      <div className="self-start xl:sticky xl:top-4" style={{ isolation: 'isolate' }}>
        <h3 className="mb-4 text-xl font-medium">{t('preview_title')}</h3>
        <div
          className="h-[700px] overflow-hidden rounded-lg border border-border"
          style={{ isolation: 'isolate' }}
        >
          <LivePreview formData={formData} />
        </div>
      </div>
    </div>
  );
};
