export type PlanId = 'essencial' | 'profissional' | 'premium';

export interface Plan {
  id: PlanId;
  level: 1 | 2 | 3;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export type LessonKind = 'video' | 'pdf';

export interface Lesson {
  id: string;
  title: string;
  kind: LessonKind;
  /** URL de incorporação do vídeo (YouTube/Vimeo/Bunny...) ou do arquivo PDF. */
  url: string;
  durationMin?: number;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  area: string;
  description: string;
  level: string;
  instructor: string;
  minPlan: PlanId;
  modules: Module[];
}

export interface Trail {
  id: string;
  title: string;
  description: string;
  courseIds: string[];
  minPlan: PlanId;
  /** true = trilha criada pelo próprio usuário */
  custom?: boolean;
}

export interface Workshop {
  id: string;
  title: string;
  date: string; // AAAA-MM-DD
  time: string;
  instructor: string;
  description: string;
  minPlan: PlanId;
  spots: number;
}

export type EventType = 'evento' | 'vaga' | 'oportunidade';

export interface EventItem {
  id: string;
  type: EventType;
  title: string;
  date: string; // AAAA-MM-DD (prazo ou data)
  location: string;
  description: string;
  link: string;
  /** Se definido, o link só aparece para assinantes deste plano ou superior. */
  minPlan?: PlanId;
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanId | null;
  role: UserRole;
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
}
