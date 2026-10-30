import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percent: number;
  label?: string;
}

export default function ProgressBar({ percent, label }: ProgressBarProps) {
  const value = Math.max(0, Math.min(100, percent));

  return (
    <div className={styles['progress-bar']}>
      {label && (
        <p className={styles['progress-bar__label']}>
          <span>{label}</span>
          <strong>{value}%</strong>
        </p>
      )}
      <div
        className={styles['progress-bar__track']}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progresso'}
      >
        <div className={styles['progress-bar__fill']} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
