'use client';

import type { Trail } from '@/types';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

/** Trilhas de aprendizagem criadas pelo próprio usuário logado. */
export function useUserTrails() {
  const { user } = useAuth();
  return useLocalStorage<Trail[]>(`user-trails:${user?.id ?? 'visitante'}`, []);
}
