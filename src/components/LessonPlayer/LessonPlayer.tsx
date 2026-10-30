import type { Lesson } from '@/types';
import Button from '../Button/Button';
import styles from './LessonPlayer.module.css';

interface LessonPlayerProps {
  lesson: Lesson;
  done: boolean;
  onToggleDone: () => void;
  onNext?: () => void;
}

export default function LessonPlayer({ lesson, done, onToggleDone, onNext }: LessonPlayerProps) {
  return (
    <div className={styles['lesson-player']}>
      <div className={styles['lesson-player__screen']}>
        {lesson.url ? (
          <iframe
            className={styles['lesson-player__frame']}
            src={lesson.url}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={styles['lesson-player__placeholder']}>
            <span aria-hidden="true">{lesson.kind === 'pdf' ? '📄' : '▶'}</span>
            <p>
              {lesson.kind === 'pdf' ? 'PDF' : 'Vídeo'} ainda não enviado. Cadastre a URL desta aula no painel
              administrativo.
            </p>
          </div>
        )}
      </div>

      <div className={styles['lesson-player__bar']}>
        <h2 className={styles['lesson-player__title']}>{lesson.title}</h2>
        <div className={styles['lesson-player__actions']}>
          {lesson.kind === 'pdf' && lesson.url && (
            <a className={styles['lesson-player__download']} href={lesson.url} target="_blank" rel="noopener noreferrer">
              Abrir PDF em nova aba
            </a>
          )}
          <Button size="sm" variant={done ? 'secondary' : 'primary'} onClick={onToggleDone}>
            {done ? '✓ Concluída' : 'Marcar como concluída'}
          </Button>
          {onNext && (
            <Button size="sm" variant="ghost" onClick={onNext}>
              Próxima aula →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
