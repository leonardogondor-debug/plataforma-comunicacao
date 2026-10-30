import styles from './Faq.module.css';

interface FaqProps {
  items: { q: string; a: string }[];
}

export default function Faq({ items }: FaqProps) {
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.q} className={styles.faq__item}>
          <summary className={styles.faq__question}>{item.q}</summary>
          <p className={styles.faq__answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
