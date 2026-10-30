'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import Button from '../Button/Button';
import styles from './AdminPanel.module.css';

export interface AdminField {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'date' | 'number' | 'url' | 'select' | 'multiselect';
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  help?: string;
  rows?: number;
}

export interface AdminColumn<T> {
  label: string;
  render: (item: T) => ReactNode;
}

interface AdminCrudProps<T extends { id: string }> {
  singular: string;
  items: T[];
  fields: AdminField[];
  columns: AdminColumn<T>[];
  onChange: (items: T[]) => void;
  /** Converte um item em valores de formulário (tudo texto). */
  toValues: (item: T) => Record<string, string>;
  /** Converte os valores do formulário em item (existing = edição). */
  fromValues: (values: Record<string, string>, existing?: T) => T;
}

/** Lista + formulário genérico (criar, editar, excluir) usado em todas as abas do admin. */
export default function AdminCrud<T extends { id: string }>({
  singular,
  items,
  fields,
  columns,
  onChange,
  toValues,
  fromValues,
}: AdminCrudProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null); // 'new' = criando
  const [values, setValues] = useState<Record<string, string>>({});

  const emptyValues = (): Record<string, string> =>
    Object.fromEntries(fields.map((f) => [f.name, f.type === 'select' && f.options?.length ? f.options[0].value : '']));

  const startNew = () => {
    setValues(emptyValues());
    setEditingId('new');
  };

  const startEdit = (item: T) => {
    setValues(toValues(item));
    setEditingId(item.id);
  };

  const cancel = () => setEditingId(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingId === 'new') {
      onChange([...items, fromValues(values)]);
    } else {
      onChange(items.map((item) => (item.id === editingId ? fromValues(values, item) : item)));
    }
    cancel();
  };

  const remove = (item: T) => {
    if (window.confirm(`Remover este ${singular}?`)) onChange(items.filter((i) => i.id !== item.id));
  };

  const setField = (name: string, value: string) => setValues((prev) => ({ ...prev, [name]: value }));

  const toggleMulti = (name: string, optionValue: string) => {
    const current = values[name] ? values[name].split(',').filter(Boolean) : [];
    const next = current.includes(optionValue) ? current.filter((v) => v !== optionValue) : [...current, optionValue];
    setField(name, next.join(','));
  };

  return (
    <div className={styles.admin__crud}>
      <div className={styles['admin__crud-head']}>
        <p className={styles.admin__count}>
          {items.length} {singular}(s) cadastrado(s)
        </p>
        {editingId === null && <Button size="sm" onClick={startNew}>+ Novo {singular}</Button>}
      </div>

      {editingId !== null && (
        <form className={styles.admin__form} onSubmit={submit}>
          <h3 className={styles['admin__form-title']}>
            {editingId === 'new' ? `Novo ${singular}` : `Editar ${singular}`}
          </h3>

          {fields.map((field) => {
            const value = values[field.name] ?? '';

            if (field.type === 'multiselect') {
              const selected = value.split(',').filter(Boolean);
              return (
                <fieldset key={field.name} className={styles.admin__fieldset}>
                  <legend className={styles.admin__label}>{field.label}</legend>
                  {field.options?.map((option) => (
                    <label key={option.value} className={styles.admin__check}>
                      <input
                        type="checkbox"
                        checked={selected.includes(option.value)}
                        onChange={() => toggleMulti(field.name, option.value)}
                      />
                      {option.label}
                      {selected.includes(option.value) && (
                        <span className={styles.admin__order}>{selected.indexOf(option.value) + 1}º</span>
                      )}
                    </label>
                  ))}
                  {field.help && <span className={styles.admin__help}>{field.help}</span>}
                </fieldset>
              );
            }

            return (
              <label key={field.name} className={styles.admin__field}>
                <span className={styles.admin__label}>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    className={styles.admin__input}
                    rows={field.rows ?? 3}
                    value={value}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(e) => setField(field.name, e.target.value)}
                  />
                ) : field.type === 'select' ? (
                  <select
                    className={styles.admin__input}
                    value={value}
                    onChange={(e) => setField(field.name, e.target.value)}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={styles.admin__input}
                    type={field.type ?? 'text'}
                    value={value}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(e) => setField(field.name, e.target.value)}
                  />
                )}
                {field.help && <span className={styles.admin__help}>{field.help}</span>}
              </label>
            );
          })}

          <div className={styles['admin__form-actions']}>
            <Button type="submit" size="sm">
              Salvar
            </Button>
            <Button size="sm" variant="ghost" onClick={cancel}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      <div className={styles['admin__table-wrap']}>
        <table className={styles.admin__table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.label} className={styles.admin__th}>
                  {column.label}
                </th>
              ))}
              <th className={styles.admin__th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.label} className={styles.admin__td}>
                    {column.render(item)}
                  </td>
                ))}
                <td className={styles.admin__td}>
                  <div className={styles['admin__row-actions']}>
                    <Button size="sm" variant="secondary" onClick={() => startEdit(item)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => remove(item)}>
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className={styles.admin__td} colSpan={columns.length + 1}>
                  Nada cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
