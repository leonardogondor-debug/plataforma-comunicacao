'use client';

import { useAccess } from '@/hooks/useAccess';
import { useAuth } from '@/hooks/useAuth';
import { useCatalog } from '@/hooks/useCatalog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import WorkshopCard from '../WorkshopCard/WorkshopCard';
import styles from './WorkshopList.module.css';

export default function WorkshopList() {
  const { user } = useAuth();
  const { workshops, ready } = useCatalog();
  const { canAccess, isLoggedIn } = useAccess();
  const [registered, setRegistered] = useLocalStorage<string[]>(`workshop-reg:${user?.id ?? 'visitante'}`, []);

  if (!ready) return <p>Carregando workshops…</p>;

  const sorted = [...workshops].sort((a, b) => a.date.localeCompare(b.date));
  const toggle = (id: string) =>
    setRegistered((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  if (sorted.length === 0) return <p>Nenhum workshop agendado no momento.</p>;

  return (
    <div className={styles['workshop-list']}>
      {sorted.map((workshop) => (
        <WorkshopCard
          key={workshop.id}
          workshop={workshop}
          locked={!canAccess(workshop.minPlan)}
          isLoggedIn={isLoggedIn}
          registered={registered.includes(workshop.id)}
          onToggle={() => toggle(workshop.id)}
        />
      ))}
    </div>
  );
}
