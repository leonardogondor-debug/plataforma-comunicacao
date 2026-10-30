import type { Metadata } from 'next';
import EventList from '@/components/EventList/EventList';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Eventos, vagas e oportunidades',
  description: 'Eventos, vagas e oportunidades na área de Comunicação.',
};

export default function EventsPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.events.title} subtitle={pages.events.subtitle} />
      <Section>
        <EventList />
      </Section>
    </>
  );
}
