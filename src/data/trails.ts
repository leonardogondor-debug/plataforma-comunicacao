import type { Trail } from '@/types';

export const seedTrails: Trail[] = [
  {
    id: 't1',
    title: 'Jornalista Multiplataforma',
    description: 'Da redação ao vídeo e às redes: o básico para produzir notícia em qualquer formato.',
    courseIds: ['c1', 'c5', 'c3'],
    minPlan: 'essencial',
  },
  {
    id: 't2',
    title: 'Assessor de Comunicação',
    description: 'Relacionamento com a imprensa, presença digital e gestão de crise.',
    courseIds: ['c2', 'c3', 'c6'],
    minPlan: 'profissional',
  },
  {
    id: 't3',
    title: 'Criador de Conteúdo de Marca',
    description: 'Vídeo, narrativa e estratégia para criar conteúdo que gera resultado.',
    courseIds: ['c5', 'c4', 'c3'],
    minPlan: 'profissional',
  },
];
