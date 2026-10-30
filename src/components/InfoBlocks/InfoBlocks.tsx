import styles from './InfoBlocks.module.css';

interface InfoBlocksProps {
  items: { title: string; text: string }[];
  numbered?: boolean;
}

/** Blocos de texto em grade. Com `numbered`, vira o passo a passo da home. */
export default function InfoBlocks({ items, numbered }: InfoBlocksProps) {
  return (
    <ol className={styles['info-blocks']}>
      {items.map((item, index) => (
        <li key={item.title} className={styles['info-blocks__item']}>
          {numbered && (
            <span className={styles['info-blocks__number']} aria-hidden="true">
              {index + 1}
            </span>
          )}
          <h3 className={styles['info-blocks__title']}>{item.title}</h3>
          <p className={styles['info-blocks__text']}>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
