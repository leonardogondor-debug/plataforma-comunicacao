import { getPlan } from '@/data/plans';
import type { Workshop } from '@/types';
import { cx } from '@/utils/cx';
import { formatDate } from '@/utils/format';
import Button from '../Button/Button';
import styles from './WorkshopCard.module.css';

interface WorkshopCardProps {
  workshop: Workshop;
  locked: boolean;
  isLoggedIn: boolean;
  registered: boolean;
  onToggle: () => void;
}

export default function WorkshopCard({ workshop, locked, isLoggedIn, registered, onToggle }: WorkshopCardProps) {
  return (
    <article className={cx(styles['workshop-card'], locked && styles['workshop-card--locked'])}>
      <p className={styles['workshop-card__date']}>
        {formatDate(workshop.date)} · {workshop.time}
      </p>
      <h3 className={styles['workshop-card__title']}>{workshop.title}</h3>
      <p className={styles['workshop-card__description']}>{workshop.description}</p>
      <p className={styles['workshop-card__meta']}>
        {workshop.instructor} · {workshop.spots} vagas · {locked ? '🔒 ' : ''}Plano {getPlan(workshop.minPlan).name}
      </p>

      {locked ? (
        <Button href={isLoggedIn ? '/planos' : '/login'} variant="secondary" size="sm">
          {isLoggedIn ? 'Fazer upgrade para participar' : 'Entrar para participar'}
        </Button>
      ) : (
        <Button variant={registered ? 'secondary' : 'primary'} size="sm" onClick={onToggle}>
          {registered ? '✓ Inscrito (cancelar)' : 'Reservar minha vaga'}
        </Button>
      )}
    </article>
  );
}
