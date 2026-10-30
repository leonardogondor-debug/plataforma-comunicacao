import type { Plan } from '@/types';
import { cx } from '@/utils/cx';
import { formatPrice } from '@/utils/format';
import Button from '../Button/Button';
import styles from './PlanCard.module.css';

interface PlanCardProps {
  plan: Plan;
  ctaHref?: string;
  ctaLabel?: string;
  current?: boolean;
}

export default function PlanCard({ plan, ctaHref, ctaLabel = 'Assinar', current }: PlanCardProps) {
  return (
    <article className={cx(styles['plan-card'], plan.highlight && styles['plan-card--highlight'])}>
      {plan.highlight && <span className={styles['plan-card__badge']}>Mais escolhido</span>}
      <h3 className={styles['plan-card__name']}>{plan.name}</h3>
      <p className={styles['plan-card__description']}>{plan.description}</p>
      <p className={styles['plan-card__price']}>
        {formatPrice(plan.price)}
        <span className={styles['plan-card__period']}> / {plan.period}</span>
      </p>
      <ul className={styles['plan-card__features']}>
        {plan.features.map((feature) => (
          <li key={feature} className={styles['plan-card__feature']}>
            {feature}
          </li>
        ))}
      </ul>
      {current ? (
        <p className={styles['plan-card__current']}>Seu plano atual</p>
      ) : (
        ctaHref && (
          <Button href={ctaHref} variant={plan.highlight ? 'primary' : 'secondary'} fullWidth>
            {ctaLabel}
          </Button>
        )
      )}
    </article>
  );
}
