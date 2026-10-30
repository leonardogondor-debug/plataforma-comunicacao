'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/hooks/useAuth';

/** Agrupa os providers globais do app (hoje: autenticação). */
export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
