import type { FieldErrors, UseFormRegister } from 'react-hook-form';

type TextInputFieldProps = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

export default function TextInputField(props: TextInputFieldProps) {
  return (
    <div>
      <div>
        <label className="text-sm font-bold text-gray-700" htmlFor={props.name}>
          {props.label}
        </label>
        <input
          id={props.name}
          className="mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
          {...props.register(props.name)}
        />
      </div>
      {typeof props.errors?.[props.name]?.message === 'string' && (
        <div className="my-2 text-xs italic text-red-500">
          {props.errors?.[props.name]?.message as string}
        </div>
      )}
    </div>
  );
}
