import Link from 'next/link';
import { footerInstitutionalNav, footerPlatformNav } from '@/data/navigation';
import { useBrand } from '@/hooks/useBrand';
import { useSiteContent } from '@/hooks/useSiteContent';
import styles from './Footer.module.css';

export default function Footer() {
  const { brand } = useBrand();
  const { footer } = useSiteContent();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__col}>
          <p className={styles.footer__brand}>{brand.name}</p>
          <p className={styles.footer__text}>{footer.about}</p>
        </div>

        <nav className={styles.footer__col} aria-label="Plataforma">
          <h2 className={styles.footer__title}>Plataforma</h2>
          <ul className={styles.footer__list}>
            {footerPlatformNav.map((item) => (
              <li key={item.href}>
                <Link className={styles.footer__link} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.footer__col} aria-label="Institucional">
          <h2 className={styles.footer__title}>Institucional</h2>
          <ul className={styles.footer__list}>
            {footerInstitutionalNav.map((item) => (
              <li key={item.href}>
                <Link className={styles.footer__link} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer__col}>
          <h2 className={styles.footer__title}>Contato</h2>
          <a className={styles.footer__link} href={`mailto:${brand.contactEmail}`}>
            {brand.contactEmail}
          </a>
        </div>
      </div>

      <p className={styles.footer__copy}>
        © {new Date().getFullYear()} {brand.name}. {footer.rights}
      </p>
    </footer>
  );
}
