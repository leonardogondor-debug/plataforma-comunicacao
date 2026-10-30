import type { ReactNode } from 'react';
import { cx } from '@/utils/cx';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  tone?: 'default' | 'alt';
  children: ReactNode;
}

export default function Section({ id, title, subtitle, tone = 'default', children }: SectionProps) {
  return (
    <section id={id} className={cx(styles.section, tone === 'alt' && styles['section--alt'])}>
      <div className={styles.section__inner}>
        {(title || subtitle) && (
          <header className={styles.section__header}>
            {title && <h2 className={styles.section__title}>{title}</h2>}
            {subtitle && <p className={styles.section__subtitle}>{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
