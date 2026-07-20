/** @jsxImportSource react */
import type { ButtonProps } from '../../../types';

export default function Button({
  children,
  type = undefined,
  color = 'btn-primary',
  disabled = false,
  block = true,
  loading = false,
}: ButtonProps) {
  return (
    <button
      className={`${block ? 'w-full' : ''} ${color} text-center py-1.5 px-4 text-sm font-medium rounded-md`}
      type={type}
      disabled={disabled || loading}
    >
      <div className='inline-flex items-center'>
        {loading && (
          <svg
            className='animate-spin ml-2 h-4 w-4 text-current'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
        {children}
      </div>
    </button>
  );
}
