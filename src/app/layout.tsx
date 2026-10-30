import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer/Footer';
import Menu from '@/components/Menu/Menu';
import Providers from '@/components/Providers/Providers';
import { brand } from '@/config/brand';
import { useBrand } from '@/hooks/useBrand';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { cssVars } = useBrand();

  return (
    <html lang="pt-BR" style={cssVars}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Providers>
          <Menu />
          <main id="conteudo">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
