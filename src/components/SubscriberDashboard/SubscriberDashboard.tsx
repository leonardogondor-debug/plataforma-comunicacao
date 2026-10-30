'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { getPlan } from '@/data/plans';
import { useAuth } from '@/hooks/useAuth';
import { useCatalog } from '@/hooks/useCatalog';
import { useProgress } from '@/hooks/useProgress';
import { useUserTrails } from '@/hooks/useUserTrails';
import { formatPrice } from '@/utils/format';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './SubscriberDashboard.module.css';

export default function SubscriberDashboard() {
  const { user, ready, updateUser, setPlan } = useAuth();
  const { courses } = useCatalog();
  const { courseProgress } = useProgress();
  const [myTrails] = useUserTrails();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) return <p>Carregando…</p>;

  if (!user) {
    return (
      <div className={styles['subscriber-dashboard__guest']}>
        <p>Entre na sua conta para ver o seu perfil e o seu progresso.</p>
        <Button href="/login">Entrar</Button>
      </div>
    );
  }

  const plan = user.plan ? getPlan(user.plan) : null;
  const inProgress = courses
    .map((course) => ({ course, progress: courseProgress(course) }))
    .filter((item) => item.progress.done > 0)
    .sort((a, b) => b.progress.percent - a.progress.percent);

  const saveName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    updateUser(user.id, { name: name.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const cancelPlan = () => {
    if (window.confirm('Deseja cancelar sua assinatura?')) setPlan(null);
  };

  return (
    <div className={styles['subscriber-dashboard']}>
      <section className={styles['subscriber-dashboard__card']} aria-labelledby="perfil-titulo">
        <h2 id="perfil-titulo" className={styles['subscriber-dashboard__title']}>
          Meu perfil
        </h2>
        <form className={styles['subscriber-dashboard__form']} onSubmit={saveName}>
          <label className={styles['subscriber-dashboard__field']}>
            <span>Nome</span>
            <input
              className={styles['subscriber-dashboard__input']}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p className={styles['subscriber-dashboard__muted']}>{user.email}</p>
          <div className={styles['subscriber-dashboard__row']}>
            <Button type="submit" size="sm">
              Salvar
            </Button>
            {saved && <span role="status">Salvo ✓</span>}
          </div>
        </form>
      </section>

      <section className={styles['subscriber-dashboard__card']} aria-labelledby="plano-titulo">
        <h2 id="plano-titulo" className={styles['subscriber-dashboard__title']}>
          Minha assinatura
        </h2>
        {plan ? (
          <>
            <p className={styles['subscriber-dashboard__plan']}>
              Plano <strong>{plan.name}</strong> · {formatPrice(plan.price)} / {plan.period}
            </p>
            <div className={styles['subscriber-dashboard__row']}>
              <Button href="/planos" size="sm" variant="secondary">
                Mudar de plano
              </Button>
              <Button size="sm" variant="danger" onClick={cancelPlan}>
                Cancelar assinatura
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={styles['subscriber-dashboard__muted']}>Você ainda não tem um plano ativo.</p>
            <Button href="/planos" size="sm">
              Escolher plano
            </Button>
          </>
        )}
      </section>

      <section
        className={`${styles['subscriber-dashboard__card']} ${styles['subscriber-dashboard__card--wide']}`}
        aria-labelledby="progresso-titulo"
      >
        <h2 id="progresso-titulo" className={styles['subscriber-dashboard__title']}>
          Continue estudando
        </h2>
        {inProgress.length === 0 ? (
          <p className={styles['subscriber-dashboard__muted']}>
            Você ainda não concluiu nenhuma aula. <Link href="/cursos">Escolha um curso</Link> para começar.
          </p>
        ) : (
          <ul className={styles['subscriber-dashboard__list']}>
            {inProgress.map(({ course, progress }) => (
              <li key={course.id} className={styles['subscriber-dashboard__item']}>
                <Link href={`/cursos/${course.slug}`} className={styles['subscriber-dashboard__link']}>
                  {course.title}
                </Link>
                <ProgressBar percent={progress.percent} label={`${progress.done} de ${progress.total} aulas`} />
              </li>
            ))}
          </ul>
        )}
        <p className={styles['subscriber-dashboard__muted']}>
          Trilhas criadas por você: {myTrails.length}. <Link href="/trilhas">Gerenciar trilhas</Link>
        </p>
      </section>
    </div>
  );
}
