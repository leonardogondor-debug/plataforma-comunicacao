import type { Course } from '@/types';
import { cx } from '@/utils/cx';
import styles from './ModuleList.module.css';

interface ModuleListProps {
  course: Course;
  activeId?: string;
  locked: boolean;
  isDone: (lessonId: string) => boolean;
  onSelect: (lessonId: string) => void;
}

export default function ModuleList({ course, activeId, locked, isDone, onSelect }: ModuleListProps) {
  return (
    <div className={styles['module-list']}>
      {course.modules.map((module, index) => (
        <details key={module.id} className={styles['module-list__module']} open>
          <summary className={styles['module-list__summary']}>
            <span className={styles['module-list__module-number']}>Módulo {index + 1}</span>
            {module.title}
          </summary>
          <ul className={styles['module-list__lessons']}>
            {module.lessons.map((lesson) => {
              const active = lesson.id === activeId;
              const done = isDone(lesson.id);
              return (
                <li key={lesson.id}>
                  <button
                    type="button"
                    className={cx(styles['module-list__lesson'], active && styles['module-list__lesson--active'])}
                    aria-current={active ? 'true' : undefined}
                    onClick={() => onSelect(lesson.id)}
                  >
                    <span
                      className={cx(styles['module-list__status'], done && styles['module-list__status--done'])}
                      aria-hidden="true"
                    >
                      {locked ? '🔒' : done ? '✓' : lesson.kind === 'pdf' ? '📄' : '▶'}
                    </span>
                    <span className={styles['module-list__lesson-title']}>{lesson.title}</span>
                    <span className={styles['module-list__lesson-meta']}>
                      {lesson.kind === 'pdf' ? 'PDF' : lesson.durationMin ? `${lesson.durationMin} min` : 'Vídeo'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </div>
  );
}
