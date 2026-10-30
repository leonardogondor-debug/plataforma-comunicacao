import type { Metadata } from 'next';
import CourseCatalog from '@/components/CourseCatalog/CourseCatalog';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Cursos',
  description: 'Catálogo de cursos de Comunicação por área.',
};

export default function CoursesPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.courses.title} subtitle={pages.courses.subtitle} />
      <Section>
        <CourseCatalog />
      </Section>
    </>
  );
}
