import type { Metadata } from 'next';
import AdminPanel from '@/components/AdminPanel/AdminPanel';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Painel administrativo',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.admin.title} subtitle={pages.admin.subtitle} />
      <Section>
        <AdminPanel />
      </Section>
    </>
  );
}
