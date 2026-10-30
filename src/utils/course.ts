import type { Course, Lesson, Module } from '@/types';
import { uid } from './format';

export function lessonsOf(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

/**
 * Painel admin: cada linha = "Módulo | Título da aula | video ou pdf | URL | minutos".
 * Aulas com o mesmo nome de módulo ficam agrupadas.
 */
export function lessonsToText(course: Course): string {
  return course.modules
    .flatMap((m) =>
      m.lessons.map((l) =>
        [m.title, l.title, l.kind, l.url, l.durationMin ?? ''].join(' | ').trimEnd(),
      ),
    )
    .join('\n');
}

export function parseLessons(text: string, existing?: Course): Module[] {
  const modules: Module[] = [];
  const oldLessons = existing ? lessonsOf(existing) : [];

  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [moduleTitle = 'Módulo', title = 'Aula', kind = 'video', url = '', minutes = ''] = line
        .split('|')
        .map((part) => part.trim());

      let mod = modules.find((m) => m.title === moduleTitle);
      if (!mod) {
        const oldModule = existing?.modules.find((m) => m.title === moduleTitle);
        mod = { id: oldModule?.id ?? uid('mod'), title: moduleTitle, lessons: [] };
        modules.push(mod);
      }

      // Reaproveita o id da aula para não perder o progresso dos alunos.
      const oldLesson = oldLessons.find((l) => l.title === title);
      mod.lessons.push({
        id: oldLesson?.id ?? uid('aula'),
        title,
        kind: kind === 'pdf' ? 'pdf' : 'video',
        url,
        durationMin: minutes ? Number(minutes) || undefined : undefined,
      });
    });

  return modules;
}
