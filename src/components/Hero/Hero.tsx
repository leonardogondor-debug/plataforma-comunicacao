import Button from '../Button/Button';
import styles from './Hero.module.css';

interface Cta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
}

export default function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__inner}>
        {eyebrow && <p className={styles.hero__eyebrow}>{eyebrow}</p>}
        <h1 className={styles.hero__title}>{title}</h1>
        <p className={styles.hero__subtitle}>{subtitle}</p>
        <div className={styles.hero__actions}>
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="ghost" className={styles['hero__ghost-button']}>
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
