import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import WorkshopList from '@/components/WorkshopList/WorkshopList';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Workshops ao vivo e práticos com profissionais de Comunicação.',
};

export default function WorkshopsPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.workshops.title} subtitle={pages.workshops.subtitle} />
      <Section>
        <WorkshopList />
      </Section>
    </>
  );
}
