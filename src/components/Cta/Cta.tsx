import Button from '../Button/Button';
import styles from './Cta.module.css';

interface CtaProps {
  title: string;
  text: string;
  button: { label: string; href: string };
}

export default function Cta({ title, text, button }: CtaProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.cta__inner}>
        <h2 className={styles.cta__title}>{title}</h2>
        <p className={styles.cta__text}>{text}</p>
        <Button href={button.href} className={styles['cta__button']}>
          {button.label}
        </Button>
      </div>
    </section>
  );
}
