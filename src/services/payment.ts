import type { PlanId } from '@/types';

/**
 * ADAPTADOR DE PAGAMENTO RECORRENTE
 *
 * A interface abaixo é o único ponto que o checkout conhece. Para ir a
 * produção, crie um provider (Stripe, Mercado Pago, Asaas, Pagar.me...) que:
 *  1. cria a assinatura/checkout no servidor (rota em /api, nunca no navegador);
 *  2. redireciona o usuário (status "redirect") ou confirma (status "active");
 *  3. receba o webhook do gateway para ativar/cancelar o plano no banco.
 * Nunca colete número de cartão no seu próprio formulário.
 */
export interface StartSubscriptionInput {
  planId: PlanId;
  userId: string;
  email: string;
}

export interface StartSubscriptionResult {
  status: 'active' | 'redirect';
  redirectUrl?: string;
}

export interface PaymentProvider {
  name: string;
  startSubscription(input: StartSubscriptionInput): Promise<StartSubscriptionResult>;
}

/** Provider de demonstração: aprova sempre, sem cobrança real. */
export const mockPaymentProvider: PaymentProvider = {
  name: 'Simulado (demonstração)',
  async startSubscription() {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { status: 'active' };
  },
};

/** Troque aqui pelo provider real quando integrar o gateway. */
export const paymentProvider: PaymentProvider = mockPaymentProvider;
