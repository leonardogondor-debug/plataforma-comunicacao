import Link from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from '@/utils/cx';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  href?: string;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  fullWidth,
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cx(
    styles.button,
    styles[`button--${variant}`],
    size === 'sm' && styles['button--sm'],
    fullWidth && styles['button--full'],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
