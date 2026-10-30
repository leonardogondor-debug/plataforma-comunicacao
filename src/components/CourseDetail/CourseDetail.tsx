'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getPlan } from '@/data/plans';
import { useAccess } from '@/hooks/useAccess';
import { useCatalog } from '@/hooks/useCatalog';
import { useProgress } from '@/hooks/useProgress';
import { lessonsOf } from '@/utils/course';
import LessonPlayer from '../LessonPlayer/LessonPlayer';
import LockedContent from '../LockedContent/LockedContent';
import ModuleList from '../ModuleList/ModuleList';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './CourseDetail.module.css';

export default function CourseDetail({ slug }: { slug: string }) {
  const { courses, ready } = useCatalog();
  const { canAccess, isLoggedIn } = useAccess();
  const { isDone, toggleLesson, courseProgress } = useProgress();
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  if (!ready) {
    return <p className={styles['course-detail__message']}>Carregando curso…</p>;
  }

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className={styles['course-detail__message']}>
        <p>Curso não encontrado.</p>
        <Link href="/cursos">← Voltar ao catálogo</Link>
      </div>
    );
  }

  const lessons = lessonsOf(course);
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const nextLesson = active ? lessons[lessons.indexOf(active) + 1] : undefined;
  const unlocked = canAccess(course.minPlan);
  const progress = courseProgress(course);

  return (
    <div className={styles['course-detail']}>
      <Link href="/cursos" className={styles['course-detail__back']}>
        ← Todos os cursos
      </Link>

      <header className={styles['course-detail__header']}>
        <p className={styles['course-detail__area']}>
          {course.area} · {course.level} · Plano {getPlan(course.minPlan).name}
        </p>
        <h1 className={styles['course-detail__title']}>{course.title}</h1>
        <p className={styles['course-detail__description']}>{course.description}</p>
        <p className={styles['course-detail__instructor']}>Com {course.instructor}</p>
        {unlocked && (
          <div className={styles['course-detail__progress']}>
            <ProgressBar percent={progress.percent} label={`${progress.done} de ${progress.total} aulas concluídas`} />
          </div>
        )}
      </header>

      <div className={styles['course-detail__layout']}>
        <div className={styles['course-detail__main']}>
          {!unlocked ? (
            <LockedContent minPlan={course.minPlan} isLoggedIn={isLoggedIn} />
          ) : active ? (
            <LessonPlayer
              key={active.id}
              lesson={active}
              done={isDone(course.id, active.id)}
              onToggleDone={() => toggleLesson(course.id, active.id)}
              onNext={nextLesson ? () => setActiveId(nextLesson.id) : undefined}
            />
          ) : (
            <p>Este curso ainda não tem aulas.</p>
          )}
        </div>

        <aside className={styles['course-detail__aside']} aria-label="Conteúdo do curso">
          <h2 className={styles['course-detail__aside-title']}>Conteúdo do curso</h2>
          <ModuleList
            course={course}
            activeId={active?.id}
            locked={!unlocked}
            isDone={(lessonId) => isDone(course.id, lessonId)}
            onSelect={setActiveId}
          />
        </aside>
      </div>
    </div>
  );
}
