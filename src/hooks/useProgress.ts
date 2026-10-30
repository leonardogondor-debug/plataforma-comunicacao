'use client';

import { useCallback } from 'react';
import type { Course } from '@/types';
import { lessonsOf } from '@/utils/course';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

export interface CourseProgress {
  done: number;
  total: number;
  percent: number;
}

/** Progresso do usuário logado: aulas concluídas por curso. */
export function useProgress() {
  const { user } = useAuth();
  const [map, setMap, ready] = useLocalStorage<Record<string, string[]>>(
    `progress:${user?.id ?? 'visitante'}`,
    {},
  );

  const isDone = useCallback(
    (courseId: string, lessonId: string) => map[courseId]?.includes(lessonId) ?? false,
    [map],
  );

  const toggleLesson = useCallback(
    (courseId: string, lessonId: string) => {
      setMap((prev) => {
        const current = prev[courseId] ?? [];
        const next = current.includes(lessonId)
          ? current.filter((id) => id !== lessonId)
          : [...current, lessonId];
        return { ...prev, [courseId]: next };
      });
    },
    [setMap],
  );

  const courseProgress = useCallback(
    (course: Course): CourseProgress => {
      const lessons = lessonsOf(course);
      const doneIds = map[course.id] ?? [];
      const done = lessons.filter((l) => doneIds.includes(l.id)).length;
      const total = lessons.length;
      return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
    },
    [map],
  );

  return { isDone, toggleLesson, courseProgress, ready };
}
