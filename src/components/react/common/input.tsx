/** @jsxImportSource react */
import { ErrorMessage, Field } from 'formik';
import type { InputProps } from '../../../types';

export default function Input({
  name,
  type = 'text',
  withLabel = false,
  isLtr = false,
  label,
  placeholder,
  classNames = 'form-input',
  disabled = false,
}: InputProps) {
  return (
    <>
      {withLabel && label ? (
        <label htmlFor={name} className='block mb-2'>
          <span className='text-base font-medium capitalize'>{label}</span>
        </label>
      ) : null}
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${classNames} ${isLtr ? 'ltr' : ''} ${
          disabled ? 'disabled' : ''
        }`}
        disabled={disabled}
      />
      <ErrorMessage name={name}>
        {(msg: string) => (
          <span className='text-red-500 text-sm pt-1 block'>{msg}</span>
        )}
      </ErrorMessage>
    </>
  );
}
