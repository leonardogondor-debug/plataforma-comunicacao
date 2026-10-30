import type { Metadata } from 'next';
import Cta from '@/components/Cta/Cta';
import InfoBlocks from '@/components/InfoBlocks/InfoBlocks';
import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';
import { useSiteContent } from '@/hooks/useSiteContent';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a plataforma, a missão e como ensinamos Comunicação.',
};

export default function AboutPage() {
  const { about, home } = useSiteContent();

  return (
    <>
      <PageHeader title={about.title} subtitle={about.subtitle} />
      <Section>
        <InfoBlocks items={about.blocks} />
      </Section>
      <Cta title={home.ctaTitle} text={home.ctaText} button={home.ctaButton} />
    </>
  );
}
