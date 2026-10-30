import AreaGrid from '@/components/AreaGrid/AreaGrid';
import Cta from '@/components/Cta/Cta';
import Faq from '@/components/Faq/Faq';
import Hero from '@/components/Hero/Hero';
import InfoBlocks from '@/components/InfoBlocks/InfoBlocks';
import PlansView from '@/components/PlansView/PlansView';
import Section from '@/components/Section/Section';
import { areaDescriptions, areas } from '@/data/areas';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function HomePage() {
  const { home } = useSiteContent();

  return (
    <>
      <Hero
        eyebrow={home.heroEyebrow}
        title={home.heroTitle}
        subtitle={home.heroSubtitle}
        primaryCta={home.heroPrimaryCta}
        secondaryCta={home.heroSecondaryCta}
      />

      <Section title={home.areasTitle} subtitle={home.areasSubtitle}>
        <AreaGrid areas={areas} descriptions={areaDescriptions} />
      </Section>

      <Section tone="alt" title={home.stepsTitle}>
        <InfoBlocks items={home.steps} numbered />
      </Section>

      <Section id="planos" title={home.plansTitle} subtitle={home.plansSubtitle}>
        <PlansView />
      </Section>

      <Section tone="alt" title={home.faqTitle}>
        <Faq items={home.faq} />
      </Section>

      <Cta title={home.ctaTitle} text={home.ctaText} button={home.ctaButton} />
    </>
  );
}
