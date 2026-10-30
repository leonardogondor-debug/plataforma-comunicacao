/**
 * IDENTIDADE VISUAL DA MARCA
 * Troque nome, textos de contato, cores e fontes aqui. Todo o site
 * (CSS Modules) lê essas cores como variáveis CSS (ver hooks/useBrand.ts).
 * Os valores abaixo são provisórios até receber o manual da marca.
 */
export const brand = {
  name: 'Comunica+',
  tagline: 'Aprenda Comunicação com quem vive o mercado',
  description:
    'Plataforma por assinatura com cursos, trilhas, workshops, eventos e oportunidades para quem quer crescer na área de Comunicação.',
  contactEmail: 'contato@comunicamais.com.br',
  /** Demonstração: e-mails que viram administradores ao se cadastrar. */
  adminEmails: ['admin@comunicamais.com.br'],
  colors: {
    primary: '#5b21b6',
    primaryDark: '#3b1380',
    primarySoft: '#ede9fe',
    accent: '#f59e0b',
    ink: '#16131f',
    muted: '#625d75',
    background: '#faf9fd',
    surface: '#ffffff',
    border: '#e4e0f0',
    success: '#15803d',
    danger: '#b91c1c',
  },
  fonts: {
    heading: "'Trebuchet MS', 'Segoe UI', system-ui, sans-serif",
    body: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  radius: '14px',
} as const;
