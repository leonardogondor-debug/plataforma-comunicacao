import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import SubscriberDashboard from '@/components/SubscriberDashboard/SubscriberDashboard';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = { title: 'Minha área' };

export default function SubscriberPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.subscriber.title} subtitle={pages.subscriber.subtitle} />
      <Section>
        <SubscriberDashboard />
      </Section>
    </>
  );
}
