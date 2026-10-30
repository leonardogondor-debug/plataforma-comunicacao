import Link from 'next/link';
import styles from './AreaGrid.module.css';

interface AreaGridProps {
  areas: string[];
  descriptions: Record<string, string>;
}

export default function AreaGrid({ areas, descriptions }: AreaGridProps) {
  return (
    <ul className={styles['area-grid']}>
      {areas.map((area) => (
        <li key={area}>
          <Link href="/cursos" className={styles['area-grid__card']}>
            <span className={styles['area-grid__name']}>{area}</span>
            <span className={styles['area-grid__text']}>{descriptions[area]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
