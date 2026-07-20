export interface AlertProps {
  message: string
  type: 'success' | 'danger' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
}

import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  color?: string
  block?: boolean
  loading?: boolean
}

export interface InputProps {
  name: string
  type?: string
  withLabel?: boolean
  label?: string
  isLtr?: boolean
  props?: object
  placeholder?: string
  classNames?: string
  disabled?: boolean
}

export interface ModalProps {
  close: () => void
  children: unknown
  title: string
}
