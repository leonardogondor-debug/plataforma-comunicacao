'use client';

import { cx } from '@/utils/cx';
import styles from './AreaFilter.module.css';

interface AreaFilterProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
}

/** Chips de filtro (usado em áreas de cursos e tipos de evento). `value` vazio = todos. */
export default function AreaFilter({ options, value, onChange, allLabel = 'Todas' }: AreaFilterProps) {
  const all = [{ label: allLabel, value: '' }, ...options.map((o) => ({ label: o, value: o }))];

  return (
    <div className={styles['area-filter']} role="group" aria-label="Filtro">
      {all.map((option) => (
        <button
          key={option.value || 'todas'}
          type="button"
          className={cx(styles['area-filter__chip'], value === option.value && styles['area-filter__chip--active'])}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
