import type { Metadata } from 'next';
import AuthForm from '@/components/AuthForm/AuthForm';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = { title: 'Criar conta' };

export default function RegisterPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.register.title} subtitle={pages.register.subtitle} />
      <Section>
        <AuthForm mode="register" />
      </Section>
    </>
  );
}
