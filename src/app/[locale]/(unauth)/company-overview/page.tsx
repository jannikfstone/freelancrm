import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { CompaniesList } from '@/components/CompaniesList';
import { CompaniesForm } from '@/components/CompanyForm';

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

const Company = () => {
  const t = useTranslations('CompanyOverview');

  return (
    <>
      <CompaniesForm />

      <Suspense fallback={<p>{t('loading_companies')}</p>}>
        <CompaniesList />
      </Suspense>

      <div className="mt-2 text-center text-sm">
        {`${t('database_powered_by')} `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://turso.tech/?utm_source=nextjsstarterbp"
          target="_blank"
        >
          Turso
        </a>
      </div>

      <a href="https://turso.tech/?utm_source=nextjsstarterbp" target="_blank">
        <Image
          className="mx-auto mt-2"
          src="/assets/images/turso-light.png"
          alt="SQLite Developer Experience"
          width={130}
          height={112}
        />
      </a>
    </>
  );
};

export default Company;
