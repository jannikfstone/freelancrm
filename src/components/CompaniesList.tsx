import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { companiesSchema } from '@/models/Schema';

import { DeleteCompaniesEntry } from './DeleteCompany';
import { EditableCompaniesEntry } from './EditableCompany';

const CompaniesList = async () => {
  const companies = await db.select().from(companiesSchema).all();

  logger.info('Get all companies entries');

  return (
    <div className="mt-5" data-testid="companies-list">
      {companies.map((elt) => (
        <div key={elt.id} className="mb-1 flex items-center gap-x-1">
          <DeleteCompaniesEntry id={elt.id} />

          <EditableCompaniesEntry id={elt.id} name={elt.name} />
        </div>
      ))}
    </div>
  );
};

export { CompaniesList };
