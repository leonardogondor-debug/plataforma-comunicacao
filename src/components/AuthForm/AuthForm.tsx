'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Button from '../Button/Button';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { user, ready, login, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const isRegister = mode === 'register';
  const update = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = isRegister ? register(form) : login({ email: form.email, password: form.password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(isRegister ? '/planos' : '/assinante');
  };

  if (ready && user) {
    return (
      <div className={styles['auth-form']}>
        <p className={styles['auth-form__text']}>
          Você está conectado como <strong>{user.name}</strong>.
        </p>
        <Button href="/assinante">Ir para minha área</Button>
      </div>
    );
  }

  return (
    <form className={styles['auth-form']} onSubmit={submit} noValidate>
      {isRegister && (
        <label className={styles['auth-form__field']}>
          <span className={styles['auth-form__label']}>Nome completo</span>
          <input
            className={styles['auth-form__input']}
            value={form.name}
            onChange={update('name')}
            autoComplete="name"
            required
          />
        </label>
      )}

      <label className={styles['auth-form__field']}>
        <span className={styles['auth-form__label']}>E-mail</span>
        <input
          className={styles['auth-form__input']}
          type="email"
          value={form.email}
          onChange={update('email')}
          autoComplete="email"
          required
        />
      </label>

      <label className={styles['auth-form__field']}>
        <span className={styles['auth-form__label']}>Senha</span>
        <input
          className={styles['auth-form__input']}
          type="password"
          value={form.password}
          onChange={update('password')}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          minLength={6}
          required
        />
      </label>

      {error && (
        <p className={styles['auth-form__error']} role="alert">
          {error}
        </p>
      )}

      <Button type="submit" fullWidth>
        {isRegister ? 'Criar conta' : 'Entrar'}
      </Button>

      <p className={styles['auth-form__switch']}>
        {isRegister ? (
          <>
            Já tem conta? <Link href="/login">Entrar</Link>
          </>
        ) : (
          <>
            Ainda não tem conta? <Link href="/cadastro">Cadastre-se</Link>
          </>
        )}
      </p>

      <p className={styles['auth-form__demo']}>
        Ambiente de demonstração: os dados ficam apenas neste navegador.
      </p>
    </form>
  );
}
