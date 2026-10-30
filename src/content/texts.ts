/**
 * TEXTOS DO SITE
 * Todo texto de página fica aqui. Para mudar um título, uma frase ou uma
 * pergunta do FAQ, edite este arquivo (acesso via hooks/useSiteContent.ts).
 */
export const texts = {
  home: {
    heroEyebrow: 'Plataforma de Comunicação',
    heroTitle: 'Sua carreira em Comunicação começa aqui',
    heroSubtitle:
      'Cursos em vídeo, trilhas de aprendizagem, workshops ao vivo e oportunidades do mercado em um só lugar. Assine e aprenda no seu ritmo.',
    heroPrimaryCta: { label: 'Ver planos', href: '/planos' },
    heroSecondaryCta: { label: 'Explorar cursos', href: '/cursos' },
    areasTitle: 'Áreas de conhecimento',
    areasSubtitle: 'Conteúdo organizado para cada frente da Comunicação.',
    stepsTitle: 'Como funciona',
    steps: [
      { title: 'Escolha seu plano', text: 'Três níveis de assinatura mensal, com cancelamento quando quiser.' },
      { title: 'Estude no seu ritmo', text: 'Videoaulas, materiais em PDF e trilhas guiadas, no computador ou no celular.' },
      { title: 'Cresça na carreira', text: 'Participe de workshops e acesse eventos, vagas e oportunidades.' },
    ],
    plansTitle: 'Planos para cada momento',
    plansSubtitle: 'Comece no plano que faz sentido e mude quando precisar.',
    faqTitle: 'Perguntas frequentes',
    faq: [
      { q: 'Posso cancelar a qualquer momento?', a: 'Sim. A assinatura é mensal e você pode cancelar pela sua área do assinante.' },
      { q: 'Preciso ter experiência na área?', a: 'Não. Há cursos para iniciantes e conteúdos avançados para quem já atua no mercado.' },
      { q: 'Como funciona o acesso por plano?', a: 'Cada curso, trilha e workshop indica o plano mínimo. Planos superiores liberam tudo dos inferiores.' },
      { q: 'Consigo assistir pelo celular?', a: 'Sim. A plataforma é responsiva e funciona em computador, tablet e celular.' },
    ],
    ctaTitle: 'Pronto para dar o próximo passo?',
    ctaText: 'Crie sua conta e escolha o plano ideal para começar hoje.',
    ctaButton: { label: 'Criar minha conta', href: '/cadastro' },
  },
  about: {
    title: 'Sobre a plataforma',
    subtitle: 'Formação prática para quem vive de Comunicação.',
    blocks: [
      { title: 'Nossa missão', text: 'Democratizar o acesso a conteúdo de qualidade em Comunicação, conectando aprendizado e mercado de trabalho.' },
      { title: 'Como ensinamos', text: 'Cursos curtos e práticos, organizados em módulos e aulas, com materiais de apoio e acompanhamento do seu progresso.' },
      { title: 'Para quem é', text: 'Estudantes, profissionais em transição e times de comunicação que querem se atualizar continuamente.' },
    ],
  },
  footer: {
    about: 'Plataforma educacional por assinatura para profissionais e estudantes de Comunicação.',
    rights: 'Todos os direitos reservados.',
  },
  pages: {
    plans: { title: 'Planos e assinatura', subtitle: 'Escolha o nível de acesso ideal. Pagamento mensal recorrente.' },
    courses: { title: 'Catálogo de cursos', subtitle: 'Filtre por área e encontre o próximo curso.' },
    trails: { title: 'Trilhas de aprendizagem', subtitle: 'Sequências de cursos para chegar a um objetivo. Você também pode montar a sua.' },
    workshops: { title: 'Workshops', subtitle: 'Encontros ao vivo e práticos com profissionais do mercado.' },
    events: { title: 'Eventos, vagas e oportunidades', subtitle: 'Tudo o que está acontecendo na área de Comunicação.' },
    login: { title: 'Entrar', subtitle: 'Acesse sua área do assinante.' },
    register: { title: 'Criar conta', subtitle: 'Leva menos de um minuto.' },
    subscriber: { title: 'Minha área', subtitle: 'Seu perfil, plano e progresso.' },
    admin: { title: 'Painel administrativo', subtitle: 'Gerencie conteúdos e usuários.' },
    checkout: { title: 'Finalizar assinatura', subtitle: 'Confirme seu plano.' },
  },
};
