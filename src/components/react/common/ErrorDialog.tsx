/** @jsxImportSource react */
import React, { useEffect, useRef, useState } from 'react'
import { hideDialog, onDialogChange } from '../../../utils/dialog'
import Button from './button'

export default function ErrorDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<any | null>(null)
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  // Subscribe to dialog events after mount (client-only)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const cleanup = onDialogChange((open: boolean, cfg?: any) => {
      setIsOpen(open)
      if (cfg) setConfig(cfg)
    })
    return cleanup
  }, [])

  // show/hide animation state
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      setVisible(true)
      // focus management after paint
      requestAnimationFrame(() => {
        const primary =
          panelRef.current?.querySelector<HTMLButtonElement>(
            '[data-lg-action="action"]',
          ) ||
          panelRef.current?.querySelector<HTMLButtonElement>(
            '[data-lg-action="close"]',
          )
        primary?.focus()
      })
    } else {
      // play closing animation then hide
      document.body.style.overflow = ''
      setVisible(false)
      // restore focus
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen])

  // Escape key closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        e.preventDefault()
        hideDialog()
      }
      // Basic focus trap
      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusable = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          ;(last as HTMLElement).focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          ;(first as HTMLElement).focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  // During SSR render a safe placeholder to avoid returning null/undefined.
  // This avoids hydration/runtime errors while keeping markup minimal.
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return (
      <div
        aria-hidden='true'
        role='dialog'
        aria-modal='true'
        style={{ display: 'none' }}
      />
    )
  }

  if (!isOpen && !visible) return null

  const cfg = config ?? { title: '', description: '', variant: 'error' }
  const variant = cfg.variant || 'error'

  // Provide Persian defaults when callers do not supply text
  const defaultTitles: Record<string, string> = {
    error: 'خطا در پردازش',
    success: 'عملیات موفق',
    warning: 'هشدار',
    info: 'اطلاع',
  }
  const defaultDescriptions: Record<string, string> = {
    error: 'خطایی پیش آمد. لطفاً مجدداً تلاش کنید یا بعداً مراجعه کنید.',
    success: '',
    warning: '',
    info: '',
  }

  const titleText = cfg.title && String(cfg.title).trim().length > 0 ? cfg.title : defaultTitles[variant] || defaultTitles.error
  const descriptionText = cfg.description && String(cfg.description).trim().length > 0 ? cfg.description : defaultDescriptions[variant] || ''

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) hideDialog()
  }

  const onPrimary = () => {
    if (cfg.onAction) cfg.onAction()
    hideDialog()
  }

  // Persian default labels
  const primaryLabel = cfg.actionLabel ? cfg.actionLabel : 'متوجه شدم'
  const secondaryLabel = 'بستن'

  return (
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      role='dialog'
      aria-modal='true'
      className={`lg-modal-root ${isOpen ? 'lg-open' : 'lg-close'}`}
    >
      <div
        ref={backdropRef}
        className={`lg-backdrop ${isOpen ? 'lg-backdrop-visible' : ''}`}
        onClick={onBackdropClick}
      />

      <div
        className='lg-container'
        aria-hidden={!isOpen}
      >
        <div
          ref={panelRef}
          className={`lg-panel-advanced lg-variant-${variant} ${isOpen ? 'lg-panel-enter' : 'lg-panel-exit'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='lg-reflections'
            aria-hidden
          />

          <div className='lg-content'>
            <h3 className='lg-title'>{titleText}</h3>
            {descriptionText && (
              <p className='lg-description'>{descriptionText}</p>
            )}
            {cfg.details && <div className='lg-details'>{cfg.details}</div>}

            <div className='lg-actions'>
              <Button
                block={false}
                color='btn-secondary'
                onClick={() => hideDialog()}
                data-lg-action='close'
              >
                {secondaryLabel}
              </Button>
              <Button
                block={false}
                color='btn-primary'
                onClick={onPrimary}
                data-lg-action='action'
              >
                {primaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Root & backdrop */
        .lg-modal-root { position: fixed; inset: 0; z-index: 99999; display: block; }
        .lg-backdrop {
          position: fixed; inset: 0; background: rgba(6,10,15,0.18);
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
          opacity: 0; transition: opacity 260ms cubic-bezier(.2,.9,.25,1);
          pointer-events: none;
        }
        .lg-backdrop-visible { opacity: 1; pointer-events: auto; }

        /* container centers the panel */
        .lg-container { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }

        /* Panel (subtle Liquid Glass) — integrated with theme tokens */
        .lg-panel-advanced {
          position: relative;
          width: min(480px, calc(100% - 48px));
          max-width: 480px;
          border-radius: 20px;
          padding: 24px;
          box-sizing: border-box;
          z-index: 100000;
          transform: translateY(0) scale(0.995);
          opacity: 0;
          transition: transform 260ms cubic-bezier(.2,.9,.25,1), opacity 220ms ease-in-out;
          /* no border — separation via shadow, transparency, and backdrop blur */
          box-shadow: 0 12px 30px rgba(2,6,23,0.06); /* softer shadow to match theme */
          backdrop-filter: blur(14px) saturate(120%);
          -webkit-backdrop-filter: blur(14px) saturate(120%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: var(--gh-fg);
          gap: 24px; /* 8px scale: 3 * 8 = 24 */
          background: transparent; /* use overlay pseudo-element for theme-aware translucent surface */
        }
        .lg-panel-advanced::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background: var(--gh-surface-elevated);
          opacity: 0.32; /* stronger translucency for a more tangible, premium surface */
          z-index: 0;
        }
        .lg-reflections { position: absolute; inset: 0; pointer-events: none; border-radius: 20px; overflow: hidden; z-index: 1; }
        .lg-content { position: relative; z-index: 2; width: 100%; }
        .lg-panel-enter { transform: scale(1); opacity: 1; }
        .lg-panel-exit { transform: scale(0.995); opacity: 0; }

        /* reflections and highlights (subtle) */
        .lg-reflections { position: absolute; inset: 0; pointer-events: none; border-radius: 20px; overflow: hidden; }
        .lg-reflections::before {
          content: '';
          position: absolute; left: -10%; top: -25%; width: 120%; height: 45%;
          background: linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02));
          transform: rotate(-10deg);
          filter: blur(10px);
          opacity: 0.45;
        }
        .lg-reflections::after {
          content: '';
          position: absolute; right: -6%; bottom: -6%; width: 55%; height: 55%;
          background: radial-gradient(closest-side, rgba(255,255,255,0.04), transparent 40%);
          filter: blur(14px);
          opacity: 0.9;
        }

        /* Icon */
        .lg-icon-wrapper { margin: 0; }
        .lg-icon-circle { width: 64px; height: 64px; border-radius: 999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 14px rgba(2,6,23,0.12), inset 0 1px 0 rgba(255,255,255,0.06); }
        .lg-icon-error { background: linear-gradient(180deg, rgba(255,230,230,0.9), rgba(255,230,230,0.6)); color: var(--gh-danger); }
        .lg-icon-success { background: linear-gradient(180deg, rgba(230,255,236,0.95), rgba(230,255,236,0.7)); color: var(--gh-success); }
        .lg-icon-warning { background: linear-gradient(180deg, rgba(255,250,230,0.95), rgba(255,250,230,0.7)); color: var(--gh-warning); }
        .lg-icon-info { background: linear-gradient(180deg, rgba(230,240,255,0.95), rgba(230,240,255,0.7)); color: var(--gh-info); }
        .lg-icon-circle svg { width: 32px; height: 32px; }

        /* Content: centered and spaced using 8px scale */
        .lg-content { width: 100%; }
        .lg-title { margin: 0; font-size: 1.25rem; font-weight: 600; line-height: 1.2; }
        .lg-description { margin: 12px 0 0; color: var(--gh-fg-secondary); line-height: 1.6; font-size: 0.95rem; max-width: 44rem; margin-top: 12px; }
        .lg-details { margin-top: 8px; padding: 10px 12px; border-radius: 10px; background: rgba(0,0,0,0.04); color: var(--gh-fg-muted); font-size: 0.85rem; }

        /* Actions: centered, equal-looking buttons */
        .lg-actions { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
        /* Buttons reuse the global .btn-primary / .btn-secondary classes for consistency */
        .lg-actions .btn-primary { min-width: 120px; height: 44px; border-radius: 12px; }
        .lg-actions .btn-secondary { min-width: 120px; height: 44px; border-radius: 12px; }

        /* Responsiveness */
        @media (max-width: 640px) {
          .lg-panel-advanced { padding: 18px; gap: 16px; width: 95%; }
          .lg-icon-circle { width: 56px; height: 56px; }
          .lg-title { font-size: 1.125rem; }
          .lg-actions { gap: 8px; }
          .lg-btn { min-width: 96px; flex: 1; }
        }
      `}</style>
    </div>
  )
}
