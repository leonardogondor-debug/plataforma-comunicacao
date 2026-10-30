import type { Course, Lesson, LessonKind } from '@/types';

/**
 * Cursos de exemplo (semente). Em produção, estes dados vêm do banco e são
 * editados no painel /admin. Em `url`, informe a URL de incorporação do vídeo
 * ou do PDF; vazio = mostra um aviso de "conteúdo ainda não enviado".
 */
const L = (id: string, title: string, kind: LessonKind, durationMin?: number): Lesson => ({
  id,
  title,
  kind,
  url: '',
  durationMin,
});

export const seedCourses: Course[] = [
  {
    id: 'c1',
    slug: 'redacao-jornalistica-na-pratica',
    title: 'Redação Jornalística na Prática',
    area: 'Jornalismo',
    level: 'Iniciante',
    instructor: 'Equipe Comunica+',
    minPlan: 'essencial',
    description: 'Aprenda a apurar, estruturar e escrever notícias claras, do lead à edição final.',
    modules: [
      {
        id: 'c1-m1',
        title: 'Fundamentos da notícia',
        lessons: [
          L('c1-m1-l1', 'O que é notícia', 'video', 12),
          L('c1-m1-l2', 'Lead e pirâmide invertida', 'video', 15),
          L('c1-m1-l3', 'Guia de apuração', 'pdf'),
        ],
      },
      {
        id: 'c1-m2',
        title: 'Texto e edição',
        lessons: [
          L('c1-m2-l1', 'Clareza e concisão', 'video', 14),
          L('c1-m2-l2', 'Títulos e linhas de apoio', 'video', 10),
        ],
      },
    ],
  },
  {
    id: 'c2',
    slug: 'assessoria-de-imprensa-moderna',
    title: 'Assessoria de Imprensa Moderna',
    area: 'Relações Públicas',
    level: 'Iniciante',
    instructor: 'Equipe Comunica+',
    minPlan: 'essencial',
    description: 'Do mapeamento de veículos ao release que vira pauta: rotina e ferramentas do assessor.',
    modules: [
      {
        id: 'c2-m1',
        title: 'Relacionamento com a imprensa',
        lessons: [
          L('c2-m1-l1', 'Mapeando veículos e jornalistas', 'video', 13),
          L('c2-m1-l2', 'Como escrever um release', 'video', 16),
          L('c2-m1-l3', 'Modelo de release', 'pdf'),
        ],
      },
      {
        id: 'c2-m2',
        title: 'Rotina e resultados',
        lessons: [
          L('c2-m2-l1', 'Pitching e follow-up', 'video', 11),
          L('c2-m2-l2', 'Clipping e mensuração', 'video', 12),
        ],
      },
    ],
  },
  {
    id: 'c3',
    slug: 'social-media-estrategico',
    title: 'Social Media Estratégico',
    area: 'Comunicação Digital',
    level: 'Intermediário',
    instructor: 'Equipe Comunica+',
    minPlan: 'profissional',
    description: 'Planejamento de conteúdo, calendário editorial e métricas que importam para marcas e criadores.',
    modules: [
      {
        id: 'c3-m1',
        title: 'Planejamento',
        lessons: [
          L('c3-m1-l1', 'Objetivos e público', 'video', 12),
          L('c3-m1-l2', 'Pilares de conteúdo', 'video', 14),
          L('c3-m1-l3', 'Planilha de calendário editorial', 'pdf'),
        ],
      },
      {
        id: 'c3-m2',
        title: 'Análise',
        lessons: [
          L('c3-m2-l1', 'Métricas essenciais', 'video', 15),
          L('c3-m2-l2', 'Relatório mensal', 'video', 10),
        ],
      },
    ],
  },
  {
    id: 'c4',
    slug: 'storytelling-para-marcas',
    title: 'Storytelling para Marcas',
    area: 'Publicidade e Propaganda',
    level: 'Intermediário',
    instructor: 'Equipe Comunica+',
    minPlan: 'profissional',
    description: 'Construa narrativas que conectam marca e público, com estrutura e exemplos reais.',
    modules: [
      {
        id: 'c4-m1',
        title: 'Estrutura narrativa',
        lessons: [
          L('c4-m1-l1', 'Jornada do herói aplicada', 'video', 16),
          L('c4-m1-l2', 'Conflito, personagem e promessa', 'video', 13),
        ],
      },
      {
        id: 'c4-m2',
        title: 'Aplicação',
        lessons: [
          L('c4-m2-l1', 'Narrativa em campanhas', 'video', 14),
          L('c4-m2-l2', 'Canvas de storytelling', 'pdf'),
        ],
      },
    ],
  },
  {
    id: 'c5',
    slug: 'producao-de-video-com-celular',
    title: 'Produção de Vídeo com Celular',
    area: 'Audiovisual',
    level: 'Iniciante',
    instructor: 'Equipe Comunica+',
    minPlan: 'essencial',
    description: 'Roteiro, captação e edição básica usando apenas o smartphone.',
    modules: [
      {
        id: 'c5-m1',
        title: 'Captação',
        lessons: [
          L('c5-m1-l1', 'Enquadramento e luz', 'video', 12),
          L('c5-m1-l2', 'Áudio limpo sem equipamento caro', 'video', 11),
        ],
      },
      {
        id: 'c5-m2',
        title: 'Edição',
        lessons: [
          L('c5-m2-l1', 'Fluxo de edição no celular', 'video', 17),
          L('c5-m2-l2', 'Checklist de gravação', 'pdf'),
        ],
      },
    ],
  },
  {
    id: 'c6',
    slug: 'gestao-de-crise-e-reputacao',
    title: 'Gestão de Crise e Reputação',
    area: 'Relações Públicas',
    level: 'Avançado',
    instructor: 'Equipe Comunica+',
    minPlan: 'premium',
    description: 'Prevenção, resposta e recuperação de reputação em cenários de crise de comunicação.',
    modules: [
      {
        id: 'c6-m1',
        title: 'Prevenção',
        lessons: [
          L('c6-m1-l1', 'Mapa de riscos', 'video', 15),
          L('c6-m1-l2', 'Manual de crise', 'pdf'),
        ],
      },
      {
        id: 'c6-m2',
        title: 'Resposta',
        lessons: [
          L('c6-m2-l1', 'Primeiras 24 horas', 'video', 18),
          L('c6-m2-l2', 'Porta-voz e posicionamento', 'video', 14),
        ],
      },
    ],
  },
];
