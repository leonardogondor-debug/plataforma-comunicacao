import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className={styles['page-header']}>
      <div className={styles['page-header__inner']}>
        <h1 className={styles['page-header__title']}>{title}</h1>
        {subtitle && <p className={styles['page-header__subtitle']}>{subtitle}</p>}
      </div>
    </div>
  );
}
