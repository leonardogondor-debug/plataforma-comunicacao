import type { Workshop } from '@/types';

export const seedWorkshops: Workshop[] = [
  {
    id: 'w1',
    title: 'Como escrever um release que vira pauta',
    date: '2026-11-18',
    time: '19:30',
    instructor: 'Convidado(a) a definir',
    description: 'Oficina prática: reescrevemos releases reais ao vivo.',
    minPlan: 'profissional',
    spots: 60,
  },
  {
    id: 'w2',
    title: 'Roteiro para vídeos curtos',
    date: '2026-12-02',
    time: '20:00',
    instructor: 'Convidado(a) a definir',
    description: 'Estrutura de roteiro para Reels, Shorts e TikTok, com exercícios.',
    minPlan: 'profissional',
    spots: 80,
  },
  {
    id: 'w3',
    title: 'Masterclass: reputação em tempo de crise',
    date: '2026-12-10',
    time: '19:00',
    instructor: 'Convidado(a) a definir',
    description: 'Estudos de caso e simulação de comitê de crise.',
    minPlan: 'premium',
    spots: 40,
  },
];
