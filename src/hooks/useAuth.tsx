'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { brand } from '@/config/brand';
import type { PlanId, User } from '@/types';
import { uid } from '@/utils/format';
import { useLocalStorage } from './useLocalStorage';

/**
 * AUTENTICAÇÃO DE DEMONSTRAÇÃO (localStorage).
 * Não guarda senha e NÃO é segura: serve só para navegar o MVP.
 * Em produção, troque as funções abaixo por Auth.js / Supabase / Firebase /
 * API própria, mantendo a mesma interface (o resto do site não muda).
 */
type Result = { ok: true } | { ok: false; error: string };

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  users: User[];
  ready: boolean;
  register: (input: RegisterInput) => Result;
  login: (input: LoginInput) => Result;
  logout: () => void;
  setPlan: (plan: PlanId | null) => void;
  updateUser: (id: string, patch: Partial<Pick<User, 'name' | 'plan' | 'role'>>) => void;
  removeUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const fail = (error: string): Result => ({ ok: false, error });
const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers, usersReady] = useLocalStorage<User[]>('auth:users', []);
  const [sessionId, setSessionId, sessionReady] = useLocalStorage<string | null>('auth:session', null);

  const user = useMemo(() => users.find((u) => u.id === sessionId) ?? null, [users, sessionId]);

  const register = useCallback(
    ({ name, email, password }: RegisterInput): Result => {
      const cleanEmail = email.trim().toLowerCase();
      if (!name.trim()) return fail('Informe seu nome.');
      if (!EMAIL_RE.test(cleanEmail)) return fail('Informe um e-mail válido.');
      if (password.length < 6) return fail('A senha precisa ter pelo menos 6 caracteres.');
      if (users.some((u) => u.email === cleanEmail)) return fail('Já existe uma conta com este e-mail.');

      const created: User = {
        id: uid('user'),
        name: name.trim(),
        email: cleanEmail,
        plan: null,
        role: (brand.adminEmails as readonly string[]).includes(cleanEmail) ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, created]);
      setSessionId(created.id);
      return { ok: true };
    },
    [users, setUsers, setSessionId],
  );

  const login = useCallback(
    ({ email, password }: LoginInput): Result => {
      const found = users.find((u) => u.email === email.trim().toLowerCase());
      if (!found || password.length < 6) return fail('E-mail ou senha inválidos.');
      setSessionId(found.id);
      return { ok: true };
    },
    [users, setSessionId],
  );

  const logout = useCallback(() => setSessionId(null), [setSessionId]);

  const updateUser = useCallback<AuthContextValue['updateUser']>(
    (id, patch) => setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u))),
    [setUsers],
  );

  const setPlan = useCallback(
    (plan: PlanId | null) => {
      if (sessionId) updateUser(sessionId, { plan });
    },
    [sessionId, updateUser],
  );

  const removeUser = useCallback(
    (id: string) => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (id === sessionId) setSessionId(null);
    },
    [setUsers, sessionId, setSessionId],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      users,
      ready: usersReady && sessionReady,
      register,
      login,
      logout,
      setPlan,
      updateUser,
      removeUser,
    }),
    [user, users, usersReady, sessionReady, register, login, logout, setPlan, updateUser, removeUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>.');
  return ctx;
}
