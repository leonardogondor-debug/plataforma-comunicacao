import type { Plan, PlanId } from '@/types';

/** Valores provisórios — ajuste preços e benefícios conforme o modelo de negócio. */
export const plans: Plan[] = [
  {
    id: 'essencial',
    level: 1,
    name: 'Essencial',
    price: 29.9,
    period: 'mês',
    description: 'Para começar a estudar com conteúdo de base.',
    features: ['Cursos de nível Essencial', 'Materiais em PDF', 'Acompanhamento de progresso', 'Eventos e vagas'],
  },
  {
    id: 'profissional',
    level: 2,
    name: 'Profissional',
    price: 59.9,
    period: 'mês',
    description: 'Para quem quer evoluir com trilhas e workshops.',
    features: ['Tudo do Essencial', 'Cursos de nível Profissional', 'Trilhas de aprendizagem', 'Workshops ao vivo'],
    highlight: true,
  },
  {
    id: 'premium',
    level: 3,
    name: 'Premium',
    price: 99.9,
    period: 'mês',
    description: 'Acesso completo para acelerar a carreira.',
    features: ['Tudo do Profissional', 'Cursos avançados e masterclasses', 'Workshops exclusivos', 'Oportunidades antecipadas'],
  },
];

export function getPlan(id: PlanId): Plan {
  return plans.find((p) => p.id === id) ?? plans[0];
}

export function planLevel(id: PlanId): number {
  return getPlan(id).level;
}
