import type { NavItem } from '@/types';

/** Itens do menu principal e do rodapé: edite aqui para mudar a navegação. */
export const mainNav: NavItem[] = [
  { label: 'Cursos', href: '/cursos' },
  { label: 'Trilhas', href: '/trilhas' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Eventos e vagas', href: '/eventos' },
  { label: 'Planos', href: '/planos' },
  { label: 'Sobre', href: '/sobre' },
];

export const footerPlatformNav: NavItem[] = [
  { label: 'Cursos', href: '/cursos' },
  { label: 'Trilhas', href: '/trilhas' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Eventos e vagas', href: '/eventos' },
];

export const footerInstitutionalNav: NavItem[] = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Planos', href: '/planos' },
  { label: 'Entrar', href: '/login' },
  { label: 'Criar conta', href: '/cadastro' },
];
