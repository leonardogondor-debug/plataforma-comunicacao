'use client';

import { plans } from '@/data/plans';
import { useAuth } from '@/hooks/useAuth';
import type { PlanId, UserRole } from '@/types';
import Button from '../Button/Button';
import styles from './AdminPanel.module.css';

/** Gestão de usuários: trocar plano/perfil e remover contas. */
export default function AdminUsers() {
  const { users, user: me, updateUser, removeUser } = useAuth();

  return (
    <div className={styles.admin__crud}>
      <p className={styles.admin__count}>{users.length} usuário(s)</p>
      <div className={styles['admin__table-wrap']}>
        <table className={styles.admin__table}>
          <thead>
            <tr>
              <th className={styles.admin__th}>Nome</th>
              <th className={styles.admin__th}>E-mail</th>
              <th className={styles.admin__th}>Plano</th>
              <th className={styles.admin__th}>Perfil</th>
              <th className={styles.admin__th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className={styles.admin__td}>{user.name}</td>
                <td className={styles.admin__td}>{user.email}</td>
                <td className={styles.admin__td}>
                  <select
                    className={styles.admin__input}
                    aria-label={`Plano de ${user.name}`}
                    value={user.plan ?? ''}
                    onChange={(e) => updateUser(user.id, { plan: (e.target.value || null) as PlanId | null })}
                  >
                    <option value="">Sem plano</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.admin__td}>
                  <select
                    className={styles.admin__input}
                    aria-label={`Perfil de ${user.name}`}
                    value={user.role}
                    disabled={user.id === me?.id}
                    onChange={(e) => updateUser(user.id, { role: e.target.value as UserRole })}
                  >
                    <option value="user">Assinante</option>
                    <option value="admin">Administrador</option>
                  </select>
                </td>
                <td className={styles.admin__td}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      if (window.confirm(`Remover a conta de ${user.name}?`)) removeUser(user.id);
                    }}
                    disabled={user.id === me?.id}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className={styles.admin__td} colSpan={5}>
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
