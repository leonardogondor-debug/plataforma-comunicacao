'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { plans } from '@/data/plans';
import { useAuth } from '@/hooks/useAuth';
import { paymentProvider } from '@/services/payment';
import { formatPrice } from '@/utils/format';
import Button from '../Button/Button';
import styles from './Checkout.module.css';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function Checkout() {
  const params = useSearchParams();
  const { user, ready, setPlan } = useAuth();
  const [status, setStatus] = useState<Status>('idle');

  const plan = plans.find((p) => p.id === params.get('plano'));

  if (!ready) return <p>Carregando…</p>;

  if (!plan) {
    return (
      <div className={styles.checkout}>
        <p>Escolha um plano para continuar.</p>
        <Button href="/planos">Ver planos</Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.checkout}>
        <p>
          Para assinar o plano <strong>{plan.name}</strong>, entre ou crie sua conta.
        </p>
        <div className={styles.checkout__actions}>
          <Button href="/cadastro">Criar conta</Button>
          <Button href="/login" variant="ghost">
            Entrar
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className={styles.checkout} role="status">
        <h2 className={styles.checkout__title}>Assinatura ativada! 🎉</h2>
        <p>
          Seu plano <strong>{plan.name}</strong> já está liberado.
        </p>
        <div className={styles.checkout__actions}>
          <Button href="/cursos">Explorar cursos</Button>
          <Button href="/assinante" variant="ghost">
            Minha área
          </Button>
        </div>
      </div>
    );
  }

  const confirm = async () => {
    setStatus('loading');
    try {
      const result = await paymentProvider.startSubscription({
        planId: plan.id,
        userId: user.id,
        email: user.email,
      });
      if (result.status === 'redirect' && result.redirectUrl) {
        window.location.href = result.redirectUrl;
        return;
      }
      setPlan(plan.id);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.checkout}>
      <h2 className={styles.checkout__title}>Resumo da assinatura</h2>
      <dl className={styles.checkout__summary}>
        <div className={styles['checkout__row']}>
          <dt>Plano</dt>
          <dd>{plan.name}</dd>
        </div>
        <div className={styles['checkout__row']}>
          <dt>Valor</dt>
          <dd>
            {formatPrice(plan.price)} / {plan.period}
          </dd>
        </div>
        <div className={styles['checkout__row']}>
          <dt>Conta</dt>
          <dd>{user.email}</dd>
        </div>
      </dl>

      {status === 'error' && (
        <p className={styles.checkout__error} role="alert">
          Não foi possível concluir. Tente novamente.
        </p>
      )}

      <Button fullWidth onClick={confirm} disabled={status === 'loading'}>
        {status === 'loading' ? 'Processando…' : 'Confirmar assinatura'}
      </Button>

      <p className={styles.checkout__note}>
        Pagamento: {paymentProvider.name}. Nenhuma cobrança real é feita neste ambiente.
      </p>
    </div>
  );
}
