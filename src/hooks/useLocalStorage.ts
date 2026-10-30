'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Estado persistido no localStorage (seguro para SSR: lê depois de montar).
 * Retorna [valor, setValor, pronto]. Em produção, os hooks que usam este
 * (catálogo, progresso, usuários) devem trocar o armazenamento por API/banco.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const valueRef = useRef<T>(initial);

  useEffect(() => {
    let next = initial;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) next = JSON.parse(raw) as T;
    } catch {
      /* armazenamento indisponível ou JSON inválido: usa o valor inicial */
    }
    valueRef.current = next;
    setValue(next);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved = typeof next === 'function' ? (next as (prev: T) => T)(valueRef.current) : next;
      valueRef.current = resolved;
      setValue(resolved);
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        /* sem espaço/permissão: mantém só em memória */
      }
    },
    [key],
  );

  return [value, set, ready] as const;
}
