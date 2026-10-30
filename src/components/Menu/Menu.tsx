'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBrand } from '@/hooks/useBrand';
import { useNavigation } from '@/hooks/useNavigation';
import { cx } from '@/utils/cx';
import Button from '../Button/Button';
import styles from './Menu.module.css';

export default function Menu() {
  const { brand } = useBrand();
  const { main, account, isLoggedIn, logout } = useNavigation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={styles.menu}>
      <div className={styles.menu__inner}>
        <Link href="/" className={styles.menu__brand} aria-label={`${brand.name} — página inicial`}>
          <span className={styles['menu__brand-mark']} aria-hidden="true">
            {brand.name.charAt(0)}
          </span>
          {brand.name}
        </Link>

        <button
          type="button"
          className={styles.menu__toggle}
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={cx(styles['menu__toggle-bar'], open && styles['menu__toggle-bar--open'])} />
        </button>

        <nav
          id="menu-principal"
          className={cx(styles.menu__nav, open && styles['menu__nav--open'])}
          aria-label="Principal"
        >
          <ul className={styles.menu__list}>
            {main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cx(styles.menu__link, isActive(item.href) && styles['menu__link--active'])}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.menu__actions}>
            {account.map((item) => (
              <Button key={item.href} href={item.href} variant={item.variant} size="sm">
                {item.label}
              </Button>
            ))}
            {isLoggedIn && (
              <Button variant="ghost" size="sm" onClick={logout}>
                Sair
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
