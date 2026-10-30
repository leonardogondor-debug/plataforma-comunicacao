'use client';

import { seedCourses } from '@/data/courses';
import { seedEvents } from '@/data/events';
import { seedTrails } from '@/data/trails';
import { seedWorkshops } from '@/data/workshops';
import type { Course, EventItem, Trail, Workshop } from '@/types';
import { useLocalStorage } from './useLocalStorage';

/**
 * Catálogo de conteúdo editável pelo painel /admin.
 * Hoje: localStorage iniciado com os dados de src/data/*.
 * Produção: troque por chamadas à API/CMS mantendo este retorno.
 */
export function useCatalog() {
  const [courses, setCourses, c] = useLocalStorage<Course[]>('catalog:courses', seedCourses);
  const [trails, setTrails, t] = useLocalStorage<Trail[]>('catalog:trails', seedTrails);
  const [workshops, setWorkshops, w] = useLocalStorage<Workshop[]>('catalog:workshops', seedWorkshops);
  const [events, setEvents, e] = useLocalStorage<EventItem[]>('catalog:events', seedEvents);

  return {
    courses,
    setCourses,
    trails,
    setTrails,
    workshops,
    setWorkshops,
    events,
    setEvents,
    ready: c && t && w && e,
  };
}
