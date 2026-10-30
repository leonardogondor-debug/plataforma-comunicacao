'use client';

import { useCallback } from 'react';
import { planLevel } from '@/data/plans';
import type { PlanId } from '@/types';
import { useAuth } from './useAuth';

/**
 * Controle de acesso por plano. Admin acessa tudo.
 * Regra: plano superior libera o conteúdo dos inferiores.
 * ATENÇÃO: em produção a mesma regra precisa ser validada no servidor
 * (API/middleware), pois checagem no navegador não protege o conteúdo.
 */
export function useAccess() {
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const level = isAdmin ? 99 : user?.plan ? planLevel(user.plan) : 0;

  const canAccess = useCallback((minPlan: PlanId) => level >= planLevel(minPlan), [level]);

  return {
    canAccess,
    isAdmin,
    isLoggedIn: Boolean(user),
    plan: user?.plan ?? null,
  };
}
