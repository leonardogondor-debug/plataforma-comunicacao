# Plataforma de Comunicação — MVP

Plataforma web educacional por assinatura (área de Comunicação).
Stack: **Next.js 15 (App Router) · React 19 · TypeScript (TSX) · CSS Modules com BEM**.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # checagem de tipos
npm run build && npm start
```

## O que o MVP já tem

| Requisito | Onde está |
|---|---|
| Site institucional | `/` (home), `/sobre` |
| Cadastro e login | `/cadastro`, `/login` |
| Área do assinante (perfil, plano, progresso) | `/assinante` |
| 3 níveis de assinatura mensal | `src/data/plans.ts`, `/planos` |
| Pagamento recorrente | `/checkout` + `src/services/payment.ts` (**simulado**) |
| Controle de acesso por plano | `src/hooks/useAccess.ts` + `LockedContent` |
| Catálogo de cursos por área | `/cursos` |
| Cursos em módulos e aulas (vídeo e PDF) | `/cursos/[slug]` |
| Progresso do usuário | `src/hooks/useProgress.ts` |
| Trilhas (da plataforma e criadas pelo usuário) | `/trilhas` |
| Workshops | `/workshops` |
| Eventos, vagas e oportunidades | `/eventos` |
| Painel administrativo (cursos, trilhas, workshops, eventos, usuários) | `/admin` |
| Layout responsivo | mobile-first em todos os CSS Modules |

## Estrutura

```
src/
  app/            rotas (só montam páginas; sem lógica)
  components/
    Menu/
      Menu.tsx
      Menu.module.css      <- um componente = uma pasta = TSX + CSS Module (BEM)
    ...
  hooks/          useBrand, useSiteContent, useNavigation, useAuth, useAccess,
                  useCatalog, useProgress, useUserTrails, useLocalStorage
  config/brand.ts identidade visual (nome, cores, fontes)
  content/texts.ts todos os textos das páginas
  data/           planos, cursos, trilhas, workshops, eventos, menu, áreas
  services/payment.ts adaptador de pagamento
  types/ utils/
```

Convenção BEM nos CSS Modules: `.card`, `.card__title`, `.card--featured`
(no TSX: `styles['card__title']`).

## Edições rápidas (pelos hooks/arquivos de configuração)

| Quero mudar… | Edite |
|---|---|
| Nome, cores, fontes, e-mail de contato | `src/config/brand.ts` (vira variáveis CSS via `useBrand`) |
| Títulos, textos, FAQ, rodapé | `src/content/texts.ts` (lido por `useSiteContent`) |
| Itens do menu / rodapé | `src/data/navigation.ts` |
| Planos, preços, benefícios | `src/data/plans.ts` |
| Áreas de conhecimento | `src/data/areas.ts` |
| Cursos/trilhas/eventos de exemplo | `src/data/*.ts` ou direto no `/admin` |

## Identidade visual

Ainda não recebi o manual da marca. Nome (**Comunica+**), cores e fontes em
`src/config/brand.ts` são **provisórios**. Ao receber logo, paleta e tipografia,
basta trocar esse arquivo (e adicionar a logo no `Menu`).

## Importante: o que é demonstração e o que falta para produção

Este MVP é um **front-end completo e navegável**, mas **não tem back-end**.
Hoje tudo é salvo no `localStorage` do navegador.

1. **Autenticação** (`src/hooks/useAuth.tsx`): simulada, sem senha real e **insegura**.
   Trocar por Auth.js, Supabase Auth, Firebase ou API própria, mantendo a mesma interface.
2. **Banco de dados** (`useCatalog`, `useProgress`, `useUserTrails`, usuários): trocar o
   `useLocalStorage` por chamadas à API/CMS (Postgres + Prisma, Supabase, etc.).
3. **Pagamento recorrente** (`src/services/payment.ts`): hoje aprova tudo sem cobrar.
   Criar um provider real (Stripe, Mercado Pago, Asaas, Pagar.me): assinatura criada no
   **servidor**, retorno/redirect e **webhook** para ativar/cancelar o plano. Nunca coletar
   cartão no formulário próprio.
4. **Proteção de conteúdo**: a regra por plano precisa ser validada **no servidor**
   (API/middleware) e os vídeos/PDFs servidos por URLs assinadas. Checagem no navegador
   não impede quem sabe a URL do vídeo.
5. **Painel admin**: o perfil admin vem de `brand.adminEmails` (só para demo). Em produção,
   o papel deve vir do banco e ser verificado no servidor.
6. **Vídeos e PDFs**: cadastre a URL de incorporação (Vimeo, YouTube não listado, Bunny
   Stream, Mux…) e do PDF no painel (`Módulo | Título | video ou pdf | URL | minutos`).
7. **Extras recomendados**: LGPD (termos, política de privacidade, consentimento),
   recuperação de senha, e-mails transacionais, certificados, SEO por curso (hoje as
   páginas de catálogo são client-side), analytics.

### Contas para testar

- Qualquer e-mail/senha (6+ caracteres) em **/cadastro** cria uma conta de assinante.
- Para entrar como **administrador**, cadastre-se com `admin@comunicamais.com.br`.
- Em `/checkout`, a assinatura é aprovada na hora (simulada); o plano libera os conteúdos
  conforme o nível (Essencial < Profissional < Premium).
