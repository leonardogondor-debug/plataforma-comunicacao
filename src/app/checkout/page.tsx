import type { Metadata } from 'next';
import { Suspense } from 'react';
import Checkout from '@/components/Checkout/Checkout';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Finalizar assinatura',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  const { pages } = useSiteContent();

  return (
    <>
      <PageHeader title={pages.checkout.title} subtitle={pages.checkout.subtitle} />
      <Section>
        <Suspense fallback={<p>Carregando…</p>}>
          <Checkout />
        </Suspense>
      </Section>
    </>
  );
}
