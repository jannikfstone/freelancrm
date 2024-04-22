'use client';

import { useState } from 'react';

import { CompaniesForm } from './CompanyForm';

const EditableCompaniesEntry = (props: { id: number; name: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((value) => !value);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="edit"
        onClick={() => {
          handleEdit();
        }}
      >
        <svg
          className="size-6 stroke-current"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4M13.5 6.5l4 4" />
        </svg>
      </button>

      <div className="ml-1 grow">
        {isEditing ? (
          <CompaniesForm
            edit
            id={props.id}
            defaultValues={{
              name: props.name,
            }}
            handleStopEditing={handleStopEditing}
          />
        ) : (
          <>
            <span className="text-gray-500">{props.name}:</span>{' '}
          </>
        )}
      </div>
    </>
  );
};

export { EditableCompaniesEntry };
