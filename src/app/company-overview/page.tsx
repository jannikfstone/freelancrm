import { Suspense } from 'react';

import { CompaniesList } from '@/components/CompaniesList';
import { CompaniesForm } from '@/components/CompaniesForm';

export async function generateMetadata() {

  return {
    title: 'meta_title',
    description: 'meta_description',
  };
}

export default function Company() {

  return (
    <>
      <CompaniesForm />

      <Suspense fallback={<p>Loading companies...</p>}>
        <CompaniesList />
      </Suspense>
    </>
  );
}
