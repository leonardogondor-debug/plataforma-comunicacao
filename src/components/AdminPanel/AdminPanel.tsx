'use client';

import { useMemo, useState } from 'react';
import { brand } from '@/config/brand';
import { areas } from '@/data/areas';
import { getPlan, plans } from '@/data/plans';
import { useAccess } from '@/hooks/useAccess';
import { useAuth } from '@/hooks/useAuth';
import { useCatalog } from '@/hooks/useCatalog';
import type { Course, EventItem, EventType, PlanId, Trail, Workshop } from '@/types';
import { lessonsOf, lessonsToText, parseLessons } from '@/utils/course';
import { cx } from '@/utils/cx';
import { formatDate, formatPrice, slugify, uid } from '@/utils/format';
import Button from '../Button/Button';
import AdminCrud from './AdminCrud';
import AdminUsers from './AdminUsers';
import styles from './AdminPanel.module.css';

type Tab = 'cursos' | 'trilhas' | 'workshops' | 'eventos' | 'usuarios';

const tabs: { id: Tab; label: string }[] = [
  { id: 'cursos', label: 'Cursos' },
  { id: 'trilhas', label: 'Trilhas' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'eventos', label: 'Eventos e vagas' },
  { id: 'usuarios', label: 'Usuários' },
];

const planOptions = plans.map((p) => ({ value: p.id, label: p.name }));

export default function AdminPanel() {
  const { user, users, ready } = useAuth();
  const { isAdmin } = useAccess();
  const { courses, setCourses, trails, setTrails, workshops, setWorkshops, events, setEvents } = useCatalog();
  const [tab, setTab] = useState<Tab>('cursos');

  const areaOptions = useMemo(
    () => Array.from(new Set([...areas, ...courses.map((c) => c.area)])).map((a) => ({ value: a, label: a })),
    [courses],
  );

  if (!ready) return <p>Carregando…</p>;

  if (!user) {
    return (
      <div className={styles.admin__notice}>
        <p>Entre com uma conta de administrador.</p>
        <Button href="/login">Entrar</Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.admin__notice}>
        <p>
          <strong>Acesso restrito.</strong> Esta área é só para administradores.
        </p>
        <p className={styles.admin__help}>
          Demonstração: cadastre-se com o e-mail {brand.adminEmails[0]} (veja src/config/brand.ts) ou peça a um
          administrador para mudar seu perfil.
        </p>
      </div>
    );
  }

  const subscribers = users.filter((u) => u.plan);
  const monthlyRevenue = subscribers.reduce((sum, u) => sum + (u.plan ? getPlan(u.plan).price : 0), 0);

  const uniqueSlug = (title: string, existing?: Course): string => {
    if (existing) return existing.slug;
    const base = slugify(title) || 'curso';
    return courses.some((c) => c.slug === base) ? `${base}-${uid('x').slice(-4)}` : base;
  };

  return (
    <div className={styles.admin}>
      <dl className={styles.admin__stats}>
        <div className={styles.admin__stat}>
          <dt>Cursos</dt>
          <dd>{courses.length}</dd>
        </div>
        <div className={styles.admin__stat}>
          <dt>Usuários</dt>
          <dd>{users.length}</dd>
        </div>
        <div className={styles.admin__stat}>
          <dt>Assinantes</dt>
          <dd>{subscribers.length}</dd>
        </div>
        <div className={styles.admin__stat}>
          <dt>Receita mensal estimada</dt>
          <dd>{formatPrice(monthlyRevenue)}</dd>
        </div>
      </dl>

      <div className={styles.admin__tabs} role="tablist" aria-label="Seções do painel">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={cx(styles.admin__tab, tab === t.id && styles['admin__tab--active'])}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'cursos' && (
          <AdminCrud
            singular="curso"
            items={courses}
            onChange={setCourses}
            fields={[
              { name: 'title', label: 'Título', required: true },
              { name: 'area', label: 'Área', type: 'select', options: areaOptions },
              { name: 'minPlan', label: 'Plano mínimo', type: 'select', options: planOptions },
              { name: 'level', label: 'Nível', placeholder: 'Iniciante, Intermediário, Avançado' },
              { name: 'instructor', label: 'Instrutor(a)' },
              { name: 'description', label: 'Descrição', type: 'textarea' },
              {
                name: 'lessons',
                label: 'Módulos e aulas',
                type: 'textarea',
                rows: 8,
                placeholder: 'Módulo 1 | Boas-vindas | video | https://player.vimeo.com/video/... | 10',
                help: 'Uma aula por linha: Módulo | Título | video ou pdf | URL de incorporação | minutos',
              },
            ]}
            columns={[
              { label: 'Curso', render: (c: Course) => c.title },
              { label: 'Área', render: (c: Course) => c.area },
              { label: 'Plano', render: (c: Course) => getPlan(c.minPlan).name },
              { label: 'Aulas', render: (c: Course) => lessonsOf(c).length },
            ]}
            toValues={(c: Course) => ({
              title: c.title,
              area: c.area,
              minPlan: c.minPlan,
              level: c.level,
              instructor: c.instructor,
              description: c.description,
              lessons: lessonsToText(c),
            })}
            fromValues={(v, existing?: Course): Course => ({
              id: existing?.id ?? uid('curso'),
              slug: uniqueSlug(v.title, existing),
              title: v.title.trim(),
              area: v.area,
              minPlan: v.minPlan as PlanId,
              level: v.level.trim(),
              instructor: v.instructor.trim(),
              description: v.description.trim(),
              modules: parseLessons(v.lessons, existing),
            })}
          />
        )}

        {tab === 'trilhas' && (
          <AdminCrud
            singular="trilha"
            items={trails}
            onChange={setTrails}
            fields={[
              { name: 'title', label: 'Título', required: true },
              { name: 'description', label: 'Descrição', type: 'textarea' },
              { name: 'minPlan', label: 'Plano mínimo', type: 'select', options: planOptions },
              {
                name: 'courseIds',
                label: 'Cursos da trilha (na ordem de seleção)',
                type: 'multiselect',
                options: courses.map((c) => ({ value: c.id, label: c.title })),
              },
            ]}
            columns={[
              { label: 'Trilha', render: (t: Trail) => t.title },
              { label: 'Cursos', render: (t: Trail) => t.courseIds.length },
              { label: 'Plano', render: (t: Trail) => getPlan(t.minPlan).name },
            ]}
            toValues={(t: Trail) => ({
              title: t.title,
              description: t.description,
              minPlan: t.minPlan,
              courseIds: t.courseIds.join(','),
            })}
            fromValues={(v, existing?: Trail): Trail => ({
              id: existing?.id ?? uid('trilha'),
              title: v.title.trim(),
              description: v.description.trim(),
              minPlan: v.minPlan as PlanId,
              courseIds: v.courseIds.split(',').filter(Boolean),
            })}
          />
        )}

        {tab === 'workshops' && (
          <AdminCrud
            singular="workshop"
            items={workshops}
            onChange={setWorkshops}
            fields={[
              { name: 'title', label: 'Título', required: true },
              { name: 'date', label: 'Data', type: 'date', required: true },
              { name: 'time', label: 'Horário', placeholder: '19:30' },
              { name: 'instructor', label: 'Instrutor(a)' },
              { name: 'description', label: 'Descrição', type: 'textarea' },
              { name: 'minPlan', label: 'Plano mínimo', type: 'select', options: planOptions },
              { name: 'spots', label: 'Vagas', type: 'number' },
            ]}
            columns={[
              { label: 'Workshop', render: (w: Workshop) => w.title },
              { label: 'Data', render: (w: Workshop) => formatDate(w.date) },
              { label: 'Plano', render: (w: Workshop) => getPlan(w.minPlan).name },
            ]}
            toValues={(w: Workshop) => ({
              title: w.title,
              date: w.date,
              time: w.time,
              instructor: w.instructor,
              description: w.description,
              minPlan: w.minPlan,
              spots: String(w.spots),
            })}
            fromValues={(v, existing?: Workshop): Workshop => ({
              id: existing?.id ?? uid('workshop'),
              title: v.title.trim(),
              date: v.date,
              time: v.time.trim(),
              instructor: v.instructor.trim(),
              description: v.description.trim(),
              minPlan: v.minPlan as PlanId,
              spots: Number(v.spots) || 0,
            })}
          />
        )}

        {tab === 'eventos' && (
          <AdminCrud
            singular="item"
            items={events}
            onChange={setEvents}
            fields={[
              {
                name: 'type',
                label: 'Tipo',
                type: 'select',
                options: [
                  { value: 'evento', label: 'Evento' },
                  { value: 'vaga', label: 'Vaga' },
                  { value: 'oportunidade', label: 'Oportunidade' },
                ],
              },
              { name: 'title', label: 'Título', required: true },
              { name: 'date', label: 'Data ou prazo', type: 'date', required: true },
              { name: 'location', label: 'Local', placeholder: 'Online, Remoto, cidade…' },
              { name: 'description', label: 'Descrição', type: 'textarea' },
              { name: 'link', label: 'Link', type: 'url', placeholder: 'https://' },
              {
                name: 'minPlan',
                label: 'Quem vê o link',
                type: 'select',
                options: [{ value: '', label: 'Todos (livre)' }, ...planOptions],
              },
            ]}
            columns={[
              { label: 'Título', render: (e: EventItem) => e.title },
              { label: 'Tipo', render: (e: EventItem) => e.type },
              { label: 'Data', render: (e: EventItem) => formatDate(e.date) },
            ]}
            toValues={(e: EventItem) => ({
              type: e.type,
              title: e.title,
              date: e.date,
              location: e.location,
              description: e.description,
              link: e.link,
              minPlan: e.minPlan ?? '',
            })}
            fromValues={(v, existing?: EventItem): EventItem => ({
              id: existing?.id ?? uid('evento'),
              type: v.type as EventType,
              title: v.title.trim(),
              date: v.date,
              location: v.location.trim(),
              description: v.description.trim(),
              link: v.link.trim(),
              minPlan: v.minPlan ? (v.minPlan as PlanId) : undefined,
            })}
          />
        )}

        {tab === 'usuarios' && <AdminUsers />}
      </div>

      <p className={styles.admin__help}>
        Demonstração: as alterações ficam salvas apenas neste navegador. Em produção, estes formulários devem gravar
        em um banco de dados/API (veja o README).
      </p>
    </div>
  );
}
