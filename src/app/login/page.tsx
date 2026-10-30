import type { Metadata } from 'next';
import AuthForm from '@/components/AuthForm/AuthForm';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = { title: 'Entrar' };

export default function LoginPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.login.title} subtitle={pages.login.subtitle} />
      <Section>
        <AuthForm mode="login" />
      </Section>
    </>
  );
}
