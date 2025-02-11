export interface Alert {
  message: string;
  type: "success" | "danger" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

export interface Button {
  children: string;
  type?: "submit" | "reset" | "button" | undefined;
  color?: "bg-blue-600" | "bg-red-600" | "bg-green-600" | "bg-gray-600";
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export interface Input {
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
