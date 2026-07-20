export interface DialogConfig {
  title: string
  description?: string
  details?: string
  variant?: 'error' | 'success' | 'warning' | 'info'
  actionLabel?: string
  onAction?: () => void
}

const EVENT_NAME = 'liquid-glass-dialog'

// Simple, framework-agnostic dispatcher.
// Rendering is handled by the React ErrorDialog component which listens
// for these events via onDialogChange.

export function showDialog(config: DialogConfig): void {
  document.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { open: true, config } }),
  )
}

export function hideDialog(): void {
  document.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { open: false } }),
  )
}

export function onDialogChange(
  callback: (open: boolean, config?: DialogConfig) => void,
): () => void {
  const handler = (e: Event) => {
    const ce = e as CustomEvent
    callback(ce.detail.open, ce.detail.config)
  }
  document.addEventListener(EVENT_NAME, handler)
  return () => document.removeEventListener(EVENT_NAME, handler)
}
