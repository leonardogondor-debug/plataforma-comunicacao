'use client';

import { useState, type FormEvent } from 'react';
import { planLevel } from '@/data/plans';
import type { Course, PlanId, Trail } from '@/types';
import { uid } from '@/utils/format';
import Button from '../Button/Button';
import styles from './TrailBuilder.module.css';

interface TrailBuilderProps {
  courses: Course[];
  onSave: (trail: Trail) => void;
}

/** A trilha exige o maior plano entre os cursos escolhidos. */
function highestPlan(selected: Course[]): PlanId {
  return selected.reduce<PlanId>(
    (best, course) => (planLevel(course.minPlan) > planLevel(best) ? course.minPlan : best),
    'essencial',
  );
}

export default function TrailBuilder({ courses, onSave }: TrailBuilderProps) {
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState('');

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return setError('Dê um nome para a sua trilha.');
    if (selected.length < 2) return setError('Escolha pelo menos 2 cursos.');

    const chosen = selected
      .map((id) => courses.find((c) => c.id === id))
      .filter((c): c is Course => Boolean(c));

    onSave({
      id: uid('trilha'),
      title: title.trim(),
      description: 'Trilha montada por você, na ordem em que escolheu os cursos.',
      courseIds: selected,
      minPlan: highestPlan(chosen),
      custom: true,
    });
    setTitle('');
    setSelected([]);
    setError('');
  };

  return (
    <form className={styles['trail-builder']} onSubmit={submit}>
      <h3 className={styles['trail-builder__title']}>Monte sua trilha</h3>
      <p className={styles['trail-builder__hint']}>
        Escolha os cursos na ordem em que quer estudar. A ordem de seleção vira a ordem da trilha.
      </p>

      <label className={styles['trail-builder__field']}>
        <span>Nome da trilha</span>
        <input
          className={styles['trail-builder__input']}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex.: Meu caminho para assessoria"
        />
      </label>

      <fieldset className={styles['trail-builder__fieldset']}>
        <legend className={styles['trail-builder__legend']}>Cursos</legend>
        {courses.map((course) => {
          const position = selected.indexOf(course.id) + 1;
          return (
            <label key={course.id} className={styles['trail-builder__option']}>
              <input type="checkbox" checked={position > 0} onChange={() => toggle(course.id)} />
              <span className={styles['trail-builder__option-title']}>{course.title}</span>
              {position > 0 && <span className={styles['trail-builder__position']}>{position}º</span>}
            </label>
          );
        })}
      </fieldset>

      {error && (
        <p className={styles['trail-builder__error']} role="alert">
          {error}
        </p>
      )}

      <Button type="submit">Salvar trilha</Button>
    </form>
  );
}
