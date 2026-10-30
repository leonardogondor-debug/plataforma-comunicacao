import Link from 'next/link';
import { getPlan } from '@/data/plans';
import type { Course } from '@/types';
import { lessonsOf } from '@/utils/course';
import { cx } from '@/utils/cx';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
  locked?: boolean;
  percent?: number;
}

export default function CourseCard({ course, locked, percent }: CourseCardProps) {
  const lessons = lessonsOf(course).length;

  return (
    <article className={cx(styles['course-card'], locked && styles['course-card--locked'])}>
      <div className={styles['course-card__tags']}>
        <span className={styles['course-card__tag']}>{course.area}</span>
        <span className={cx(styles['course-card__tag'], styles['course-card__tag--plan'])}>
          {locked ? '🔒 ' : ''}Plano {getPlan(course.minPlan).name}
        </span>
      </div>
      <h3 className={styles['course-card__title']}>
        <Link href={`/cursos/${course.slug}`} className={styles['course-card__link']}>
          {course.title}
        </Link>
      </h3>
      <p className={styles['course-card__description']}>{course.description}</p>
      <p className={styles['course-card__meta']}>
        {course.level} · {course.modules.length} módulos · {lessons} aulas
      </p>
      {typeof percent === 'number' && percent > 0 && <ProgressBar percent={percent} label="Seu progresso" />}
    </article>
  );
}
