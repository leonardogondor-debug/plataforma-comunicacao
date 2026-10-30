import type { CSSProperties } from 'react';
import { brand } from '@/config/brand';

/**
 * Entrega a marca e as variáveis CSS correspondentes.
 * Para trocar o visual do site, edite apenas src/config/brand.ts.
 */
export function useBrand() {
  const c = brand.colors;

  const cssVars = {
    '--color-primary': c.primary,
    '--color-primary-dark': c.primaryDark,
    '--color-primary-soft': c.primarySoft,
    '--color-accent': c.accent,
    '--color-ink': c.ink,
    '--color-muted': c.muted,
    '--color-background': c.background,
    '--color-surface': c.surface,
    '--color-border': c.border,
    '--color-success': c.success,
    '--color-danger': c.danger,
    '--font-heading': brand.fonts.heading,
    '--font-body': brand.fonts.body,
    '--radius': brand.radius,
  } as CSSProperties;

  return { brand, cssVars };
}
