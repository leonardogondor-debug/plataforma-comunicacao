'use client';

import { useMemo, useState } from 'react';
import { areas } from '@/data/areas';
import { useAccess } from '@/hooks/useAccess';
import { useCatalog } from '@/hooks/useCatalog';
import { useProgress } from '@/hooks/useProgress';
import AreaFilter from '../AreaFilter/AreaFilter';
import CourseCard from '../CourseCard/CourseCard';
import styles from './CourseCatalog.module.css';

export default function CourseCatalog() {
  const { courses, ready } = useCatalog();
  const { canAccess } = useAccess();
  const { courseProgress } = useProgress();
  const [area, setArea] = useState('');

  const areaOptions = useMemo(() => Array.from(new Set([...areas, ...courses.map((c) => c.area)])), [courses]);
  const visible = area ? courses.filter((c) => c.area === area) : courses;

  if (!ready) return <p>Carregando cursos…</p>;

  return (
    <div className={styles['course-catalog']}>
      <AreaFilter options={areaOptions} value={area} onChange={setArea} allLabel="Todas as áreas" />

      {visible.length === 0 ? (
        <p className={styles['course-catalog__empty']}>Nenhum curso nesta área ainda.</p>
      ) : (
        <div className={styles['course-catalog__grid']}>
          {visible.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              locked={!canAccess(course.minPlan)}
              percent={courseProgress(course).percent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
