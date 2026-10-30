'use client';

import { mainNav } from '@/data/navigation';
import type { NavItem } from '@/types';
import { useAuth } from './useAuth';

interface AccountItem extends NavItem {
  variant: 'primary' | 'secondary' | 'ghost';
}

/** Itens do menu conforme o estado de login (edite os rótulos aqui). */
export function useNavigation() {
  const { user, logout } = useAuth();

  const account: AccountItem[] = user
    ? [
        { label: 'Minha área', href: '/assinante', variant: 'secondary' },
        ...(user.role === 'admin' ? [{ label: 'Admin', href: '/admin', variant: 'ghost' as const }] : []),
      ]
    : [
        { label: 'Entrar', href: '/login', variant: 'ghost' },
        { label: 'Assinar', href: '/planos', variant: 'primary' },
      ];

  return { main: mainNav, account, isLoggedIn: Boolean(user), logout };
}
