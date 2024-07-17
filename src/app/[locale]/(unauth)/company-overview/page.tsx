import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { CompaniesList } from '@/components/CompaniesList';
import { CompaniesForm } from '@/components/CompaniesForm';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'CompanyOverview',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Company() {
  const t = useTranslations('CompanyOverview');

  return (
    <>
      <CompaniesForm />

      <Suspense fallback={<p>{t('loading_companies')}</p>}>
        <CompaniesList />
      </Suspense>
    </>
  );
}
