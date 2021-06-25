import { ButtonHTMLAttributes } from 'react'
import styles from './button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutline?: boolean;
};

export function Button({ isOutline = false, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${isOutline ? styles.outlined : ''}`}
      {...props}
    />
  );
}
