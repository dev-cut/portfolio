import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/classNames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  variant = 'primary',
  children,
  loading = false,
  loadingText,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? loadingText || '처리 중...' : children}
    </button>
  );
}
