import { getPlan } from '@/data/plans';
import type { PlanId } from '@/types';
import Button from '../Button/Button';
import styles from './LockedContent.module.css';

interface LockedContentProps {
  minPlan: PlanId;
  isLoggedIn: boolean;
  title?: string;
}

/** Aviso de conteúdo bloqueado, com o caminho certo conforme o estado do usuário. */
export default function LockedContent({ minPlan, isLoggedIn, title = 'Conteúdo exclusivo para assinantes' }: LockedContentProps) {
  const plan = getPlan(minPlan);

  return (
    <div className={styles['locked-content']} role="status">
      <span className={styles['locked-content__icon']} aria-hidden="true">
        🔒
      </span>
      <h3 className={styles['locked-content__title']}>{title}</h3>
      <p className={styles['locked-content__text']}>
        Disponível a partir do plano <strong>{plan.name}</strong>.
        {!isLoggedIn && ' Entre ou crie uma conta para continuar.'}
      </p>
      <div className={styles['locked-content__actions']}>
        <Button href="/planos">Ver planos</Button>
        {!isLoggedIn && (
          <Button href="/login" variant="ghost">
            Entrar
          </Button>
        )}
      </div>
    </div>
  );
}
