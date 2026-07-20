export interface AlertProps {
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

export interface ButtonProps {
  children: string;
  type?: 'submit' | 'reset' | 'button';
  color?: 'bg-blue-600' | 'bg-red-600' | 'bg-green-600' | 'bg-gray-600' | 'bg-[#556ee6]';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export interface InputProps {
  name: string;
  type?: string;
  withLabel?: boolean;
  label?: string;
  isLtr?: boolean;
  props?: object;
  placeholder?: string;
  classNames?: string;
  disabled?: boolean;
}

export interface ModalProps {
  close: () => void;
  children: unknown;
  title: string;
}
