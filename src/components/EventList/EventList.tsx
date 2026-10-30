'use client';

import { useState } from 'react';
import { useAccess } from '@/hooks/useAccess';
import { useCatalog } from '@/hooks/useCatalog';
import type { EventType } from '@/types';
import AreaFilter from '../AreaFilter/AreaFilter';
import EventCard from '../EventCard/EventCard';
import styles from './EventList.module.css';

const typeByLabel: Record<string, EventType> = {
  Eventos: 'evento',
  Vagas: 'vaga',
  Oportunidades: 'oportunidade',
};

export default function EventList() {
  const { events, ready } = useCatalog();
  const { canAccess, isLoggedIn } = useAccess();
  const [label, setLabel] = useState('');

  if (!ready) return <p>Carregando…</p>;

  const type = typeByLabel[label];
  const visible = [...events]
    .filter((event) => !type || event.type === type)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <AreaFilter options={Object.keys(typeByLabel)} value={label} onChange={setLabel} allLabel="Tudo" />
      {visible.length === 0 ? (
        <p>Nada por aqui ainda.</p>
      ) : (
        <div className={styles['event-list__grid']}>
          {visible.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isLoggedIn={isLoggedIn}
              canOpen={!event.minPlan || canAccess(event.minPlan)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
