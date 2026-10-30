import Link from 'next/link';
import { getPlan } from '@/data/plans';
import type { Course, Trail } from '@/types';
import { cx } from '@/utils/cx';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './TrailCard.module.css';

interface TrailCardProps {
  trail: Trail;
  courses: Course[];
  percent: number;
  locked?: boolean;
  onRemove?: () => void;
}

export default function TrailCard({ trail, courses, percent, locked, onRemove }: TrailCardProps) {
  return (
    <article className={cx(styles['trail-card'], locked && styles['trail-card--locked'])}>
      <div className={styles['trail-card__tags']}>
        <span className={styles['trail-card__tag']}>{trail.custom ? 'Minha trilha' : 'Trilha da plataforma'}</span>
        <span className={styles['trail-card__tag']}>
          {locked ? '🔒 ' : ''}Plano {getPlan(trail.minPlan).name}
        </span>
      </div>
      <h3 className={styles['trail-card__title']}>{trail.title}</h3>
      <p className={styles['trail-card__description']}>{trail.description}</p>

      <ol className={styles['trail-card__steps']}>
        {courses.map((course) => (
          <li key={course.id} className={styles['trail-card__step']}>
            <Link href={`/cursos/${course.slug}`} className={styles['trail-card__step-link']}>
              {course.title}
            </Link>
            <span className={styles['trail-card__step-area']}>{course.area}</span>
          </li>
        ))}
      </ol>

      {!locked && <ProgressBar percent={percent} label="Progresso na trilha" />}

      {onRemove && (
        <div className={styles['trail-card__footer']}>
          <Button size="sm" variant="danger" onClick={onRemove}>
            Remover trilha
          </Button>
        </div>
      )}
    </article>
  );
}
