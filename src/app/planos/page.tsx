import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader/PageHeader';
import PlansView from '@/components/PlansView/PlansView';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Planos e assinatura',
  description: 'Três níveis de assinatura mensal para estudar Comunicação.',
};

export default function PlansPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.plans.title} subtitle={pages.plans.subtitle} />
      <Section>
        <PlansView />
      </Section>
    </>
  );
}
