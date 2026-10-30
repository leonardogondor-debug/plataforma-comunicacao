import { getPlan } from '@/data/plans';
import type { EventItem, EventType } from '@/types';
import { cx } from '@/utils/cx';
import { formatDate } from '@/utils/format';
import Button from '../Button/Button';
import styles from './EventCard.module.css';

const typeLabel: Record<EventType, string> = {
  evento: 'Evento',
  vaga: 'Vaga',
  oportunidade: 'Oportunidade',
};

interface EventCardProps {
  event: EventItem;
  canOpen: boolean;
  isLoggedIn: boolean;
}

export default function EventCard({ event, canOpen, isLoggedIn }: EventCardProps) {
  return (
    <article className={styles['event-card']}>
      <div className={styles['event-card__top']}>
        <span className={cx(styles['event-card__type'], styles[`event-card__type--${event.type}`])}>
          {typeLabel[event.type]}
        </span>
        <span className={styles['event-card__date']}>{formatDate(event.date)}</span>
      </div>
      <h3 className={styles['event-card__title']}>{event.title}</h3>
      <p className={styles['event-card__description']}>{event.description}</p>
      <p className={styles['event-card__location']}>📍 {event.location}</p>

      {canOpen ? (
        <Button
          href={event.link}
          variant="secondary"
          size="sm"
        >
          Ver detalhes
        </Button>
      ) : (
        <Button href={isLoggedIn ? '/planos' : '/login'} variant="ghost" size="sm">
          🔒 Disponível no plano {event.minPlan ? getPlan(event.minPlan).name : ''}
        </Button>
      )}
    </article>
  );
}
