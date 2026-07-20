/** @jsxImportSource react */
import type React from 'react';

interface Props {
  close: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal({ close, children, title }: Props) {
  return (
    <div className='relative z-10'>
      <div
        className='fixed inset-0 transition-opacity'
        style={{ backgroundColor: 'var(--gh-overlay)' }}
      ></div>
      <div className='fixed inset-0 z-20 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0'>
          <div
            className='relative transform overflow-hidden rounded-lg transition-all sm:my-8 sm:w-full sm:max-w-lg'
            style={{
              backgroundColor: 'var(--gh-surface-elevated)',
              border: '1px solid var(--gh-border)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            }}
          >
            <div
              className='flex items-center justify-between p-4 md:p-5'
              style={{ borderBottom: '1px solid var(--gh-border)' }}
            >
              <h3 className='text-base font-semibold' style={{ color: 'var(--gh-fg)' }}>
                {title}
              </h3>
              <button
                type='button'
                className='rounded-md text-sm w-8 h-8 inline-flex justify-center items-center transition-colors duration-150'
                style={{ color: 'var(--gh-fg-secondary)' }}
                onClick={close}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--gh-fg)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gh-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--gh-fg-secondary)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>close</span>
              </button>
            </div>
            <div className='w-full p-4'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
