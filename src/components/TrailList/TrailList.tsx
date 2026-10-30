'use client';

import { useAccess } from '@/hooks/useAccess';
import { useCatalog } from '@/hooks/useCatalog';
import { useProgress } from '@/hooks/useProgress';
import { useUserTrails } from '@/hooks/useUserTrails';
import type { Course, Trail } from '@/types';
import Section from '../Section/Section';
import TrailBuilder from '../TrailBuilder/TrailBuilder';
import TrailCard from '../TrailCard/TrailCard';
import Button from '../Button/Button';
import styles from './TrailList.module.css';

export default function TrailList() {
  const { trails, courses, ready } = useCatalog();
  const { canAccess, isLoggedIn } = useAccess();
  const { courseProgress } = useProgress();
  const [myTrails, setMyTrails] = useUserTrails();

  if (!ready) return <p className={styles['trail-list__message']}>Carregando trilhas…</p>;

  const resolve = (trail: Trail): Course[] =>
    trail.courseIds.map((id) => courses.find((c) => c.id === id)).filter((c): c is Course => Boolean(c));

  const percentOf = (list: Course[]): number => {
    const totals = list.reduce(
      (acc, course) => {
        const p = courseProgress(course);
        return { done: acc.done + p.done, total: acc.total + p.total };
      },
      { done: 0, total: 0 },
    );
    return totals.total ? Math.round((totals.done / totals.total) * 100) : 0;
  };

  return (
    <>
      <Section title="Trilhas da plataforma" subtitle="Caminhos prontos, com a ordem recomendada de estudo.">
        <div className={styles['trail-list__grid']}>
          {trails.map((trail) => {
            const list = resolve(trail);
            return (
              <TrailCard
                key={trail.id}
                trail={trail}
                courses={list}
                percent={percentOf(list)}
                locked={!canAccess(trail.minPlan)}
              />
            );
          })}
        </div>
      </Section>

      <Section tone="alt" title="Minhas trilhas" subtitle="Crie sequências de cursos do seu jeito.">
        {!isLoggedIn ? (
          <div className={styles['trail-list__login']}>
            <p>Entre na sua conta para criar e acompanhar trilhas personalizadas.</p>
            <Button href="/login">Entrar</Button>
          </div>
        ) : (
          <div className={styles['trail-list__mine']}>
            <TrailBuilder courses={courses} onSave={(trail) => setMyTrails((prev) => [...prev, trail])} />
            <div className={styles['trail-list__grid']}>
              {myTrails.length === 0 && (
                <p className={styles['trail-list__message']}>Você ainda não criou nenhuma trilha.</p>
              )}
              {myTrails.map((trail) => {
                const list = resolve(trail);
                return (
                  <TrailCard
                    key={trail.id}
                    trail={trail}
                    courses={list}
                    percent={percentOf(list)}
                    locked={!canAccess(trail.minPlan)}
                    onRemove={() => setMyTrails((prev) => prev.filter((t) => t.id !== trail.id))}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
