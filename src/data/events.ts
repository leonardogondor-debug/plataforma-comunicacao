import type { EventItem } from '@/types';

export const seedEvents: EventItem[] = [
  {
    id: 'e1',
    type: 'evento',
    title: 'Encontro Nacional de Comunicação (exemplo)',
    date: '2026-11-25',
    location: 'Online',
    description: 'Painéis e networking com profissionais de Comunicação de todo o país.',
    link: 'https://example.com/evento',
  },
  {
    id: 'e2',
    type: 'vaga',
    title: 'Analista de Comunicação Digital (exemplo)',
    date: '2026-11-30',
    location: 'Remoto',
    description: 'Vaga para planejar conteúdo, acompanhar métricas e apoiar a assessoria.',
    link: 'https://example.com/vaga',
    minPlan: 'essencial',
  },
  {
    id: 'e3',
    type: 'oportunidade',
    title: 'Chamada para freelancers de vídeo (exemplo)',
    date: '2026-12-05',
    location: 'Remoto',
    description: 'Produtora busca editores para projetos de vídeo institucional.',
    link: 'https://example.com/oportunidade',
    minPlan: 'profissional',
  },
];
