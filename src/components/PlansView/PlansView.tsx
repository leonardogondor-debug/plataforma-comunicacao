'use client';

import { plans } from '@/data/plans';
import { useAuth } from '@/hooks/useAuth';
import PlanCard from '../PlanCard/PlanCard';
import styles from './PlansView.module.css';

/** Planos com CTA que muda conforme o usuário (assinar, trocar ou plano atual). */
export default function PlansView() {
  const { user } = useAuth();

  return (
    <div className={styles['plans-view']}>
      {plans.map((plan) => {
        const current = user?.plan === plan.id;
        return (
          <PlanCard
            key={plan.id}
            plan={plan}
            current={current}
            ctaHref={`/checkout?plano=${plan.id}`}
            ctaLabel={user?.plan ? 'Mudar para este plano' : 'Assinar'}
          />
        );
      })}
    </div>
  );
}
