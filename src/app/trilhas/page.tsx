import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader/PageHeader';
import TrailList from '@/components/TrailList/TrailList';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Trilhas de aprendizagem',
  description: 'Sequências de cursos para alcançar um objetivo. Monte a sua trilha.',
};

export default function TrailsPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.trails.title} subtitle={pages.trails.subtitle} />
      <TrailList />
    </>
  );
}
