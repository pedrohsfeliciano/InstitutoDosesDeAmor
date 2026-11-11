"use strict";
      const $ = (s, root = document) => root.querySelector(s);
      const $$ = (s, root = document) => [...root.querySelectorAll(s)];
      const esc = (value) =>
        String(value ?? "").replace(
          /[&<>"']/g,
          (ch) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[ch],
        );
      const main = $("#conteudo");
      const sources = {
        ms: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/cancer-de-mama/cancer-de-mama/",
        cancer:
          "https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-populacao",
        rights:
          "https://www.gov.br/inca/pt-br/acesso-a-informacao/perguntas-frequentes/direitos-sociais-da-pessoa-com-cancer",
        book: "https://www.gov.br/inca/pt-br/assuntos/cancer/orientacoes-aos-pacientes-e-familiares",
      };
      const shapes = {
        heart:
          '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
        book: '<path d="M12 5v16M12 5C8 2 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-3-1-6-2-10 1Z"/>',
        people:
          '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M21 21v-3a6 6 0 0 0-4-5"/>',
        hand: '<path d="m2 14 4-3 6 3h5a2 2 0 0 1 0 4h-7M2 20l4 1 11-1 5-5M8 7l4 4 4-4a2.7 2.7 0 0 0-4-3 2.7 2.7 0 0 0-4 3Z"/>',
        building:
          '<path d="M3 22V5l9-3v20M12 8h9v14M1 22h22M6 8h2M6 12h2M6 16h2M16 12h2M16 16h2"/>',
        star: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
        share:
          '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10 6-3M9 14l6 3"/>',
        mail: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 5 10 8L22 5"/>',
        calendar:
          '<rect x="3" y="5" width="18" height="17" rx="3"/><path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3"/>',
        person:
          '<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
        ribbon:
          '<path d="m5 22 10-14c4-6-10-8-6-1l10 15M8 4c2 2 6 2 8 0M8 8l8 12M16 8 8 20"/>',
        check: '<path d="m5 12 4 4L20 5"/>',
        globe:
          '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c7 5 7 15 0 20-7-5-7-15 0-20Z"/>',
      };
      const icon = (name) =>
        `<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24">${shapes[name] || shapes.heart}</svg></span>`;
      const link = (label, path, style = "primary") =>
        `<a class="btn ${style}" href="#${path}">${label}<span aria-hidden="true">↗</span></a>`;
      const tag = (label) => `<span class="pill">${label}</span>`;
      const pending = (text) =>
        `<div class="notice"><span class="label">Conteúdo em validação</span>${text}</div>`;
      const section = (content, cls = "") =>
        `<section class="section ${cls}"><div class="wrap">${content}</div></section>`;
      const breadcrumbs = (items) =>
        `<div class="wrap"><nav class="breadcrumbs" aria-label="Você está em"><a href="#/home">Home</a>${items.map(([text, path]) => `<span aria-hidden="true">/</span>${path ? `<a href="#${path}">${text}</a>` : `<span aria-current="page">${text}</span>`}`).join("")}</nav></div>`;
      function head(title, intro, eyebrow, crumbs, extra = "") {
        return (
          breadcrumbs(crumbs || [[title]]) +
          `<section class="page-head"><div class="wrap"><div class="eyebrow">${eyebrow || "Instituto Doses de Amor"}</div><h1 tabindex="-1">${title}</h1><p class="lead muted">${intro}</p>${extra}</div></section>`
        );
      }
      function banner() {
        return section(
          `<div class="band"><div><h2>Seu gesto pode ser<br>uma dose de <i>amor.</i></h2><p>Encontre uma forma de contribuir que faça sentido para você.</p></div>${link("Quero fazer parte", "/ajudar")}</div>`,
          "compact",
        );
      }
      const faq = (rows) =>
        `<div class="faq">${rows.map(([q, a]) => `<details class="accordion"><summary>${q}</summary><div>${a}</div></details>`).join("")}</div>`;
      const helpWays = [
        {
          slug: "empresa-parceira",
          title: "Empresa Parceira",
          icon: "building",
          kicker: "Um compromisso que continua",
          desc: "Com doações mensais, sua empresa pode trazer mais previsibilidade ao Doses de Amor e contribuir para que o Instituto responda às necessidades identificadas no dia a dia.",
          cta: "Quero ser empresa parceira",
          what: "Converse sobre uma contribuição mensal e construa uma proposta compatível com a sua empresa.",
          field: "Como sua empresa gostaria de contribuir?",
          placeholder:
            "Conte a ideia de apoio mensal, sem incluir dados financeiros.",
          kind: "empresa",
        },
        {
          slug: "parceria-estrategica",
          title: "Parceria Estratégica",
          icon: "hand",
          kicker: "Conhecimento e recursos que somam",
          desc: "Sua empresa pode oferecer produtos ou serviços ao Doses de Amor. A parceria é uma oportunidade de reduzir custos e apoiar as necessidades que o Instituto confirmar.",
          cta: "Quero oferecer uma parceria",
          what: "Apresente seu produto ou serviço. A proposta deverá ser avaliada conforme as necessidades do Instituto.",
          field: "Qual produto ou serviço você pode oferecer?",
          placeholder:
            "Descreva o que oferece, a quantidade ou o alcance, se souber.",
          kind: "empresa",
        },
        {
          slug: "doacoes-financeiras",
          title: "Doações Financeiras",
          icon: "heart",
          kicker: "Uma contribuição do seu jeito",
          desc: "Doações pontuais ou mensais são uma forma direta de apoiar o Doses de Amor. A destinação dos recursos e os meios de pagamento serão informados após validação pelo Instituto.",
          cta: "Conhecer formas de contribuição",
          what: "Os valores e a frequência são sugestões. Os pagamentos ainda não estão disponíveis.",
          kind: "doar",
        },
        {
          slug: "trabalho-voluntario",
          title: "Trabalho Voluntário",
          icon: "people",
          kicker: "Tempo e conhecimento também acolhem",
          desc: "Compartilhe seu tempo e suas habilidades com o Doses de Amor. As oportunidades e a disponibilidade para atuação deverão ser combinadas com o Instituto.",
          cta: "Quero ser voluntário",
          what: "Conte o que você sabe fazer e sua disponibilidade. Não há vagas ou escalas confirmadas neste protótipo.",
          field: "Como você gostaria de participar?",
          placeholder:
            "Fale sobre suas habilidades e interesses. Não inclua informações de saúde.",
          kind: "voluntario",
        },
        {
          slug: "compartilhando-nosso-trabalho",
          title: "Compartilhando nosso trabalho",
          icon: "share",
          kicker: "O amor também se espalha",
          desc: "Ajude mais pessoas a conhecer o Doses de Amor. Compartilhe informações oficiais do Instituto e participe da divulgação de campanhas que forem confirmadas.",
          cta: "Quero compartilhar",
          what: "Copie a mensagem sugerida e revise antes de compartilhar. A divulgação de campanhas deve usar informações oficiais.",
          kind: "share",
        },
      ];
      const activities = [
        {
          slug: "encontros-de-acolhimento",
          title: "Encontros de acolhimento",
          category: "Acolhimento",
          icon: "people",
          desc: "Espaço previsto para apresentar encontros, público, formato e critérios de participação. A realização dessas ações precisa ser confirmada.",
        },
        {
          slug: "informacao-e-conscientizacao",
          title: "Informação e conscientização",
          category: "Informação",
          icon: "book",
          desc: "Espaço previsto para ações educativas com temas, fontes de informação e responsáveis pela revisão do conteúdo.",
        },
        {
          slug: "campanhas-solidarias",
          title: "Campanhas solidárias",
          category: "Mobilização",
          icon: "heart",
          desc: "Espaço previsto para campanhas aprovadas, com objetivo, período, formas de participação e prestação de contas.",
        },
        {
          slug: "encontros-com-voluntarios",
          title: "Encontros com voluntários",
          category: "Mobilização",
          icon: "hand",
          desc: "Espaço previsto para divulgar oportunidades de participação e os próximos passos de quem deseja contribuir.",
        },
      ];
      const partnerRecords = {
        current: [
          {
            name: "Instituto Quimioterapia & Beleza",
            slug: "quimioterapia-beleza",
            logo: "./assets/images/partners/quimioterapia-beleza.webp",
            logoAlt: "Logotipo do Instituto Quimioterapia & Beleza",
            logoWidth: 282,
            logoHeight: 169,
            url: "https://quimioterapiaebeleza.org.br/",
            esg: "Social · saúde, bem-estar e mobilização",
            description: "Atua com acolhimento, informação, autoestima, Banco de Lenços, apoio psicológico e ações de conscientização para pacientes oncológicos.",
            advantage: "A parceria cria uma ponte direta entre propósito social, conscientização e engajamento de colaboradores, ajudando a transformar apoio institucional em uma experiência participativa de marca.",
          },
          {
            name: "Cabelegria",
            slug: "cabelegria",
            logo: "./assets/images/partners/cabelegria.webp",
            logoAlt: "Logotipo da Cabelegria",
            logoWidth: 760,
            logoHeight: 187,
            url: "https://www.cabelegria.org/",
            esg: "Social · autoestima, inclusão e geração de renda",
            description: "Transforma doações de cabelo em perucas gratuitas e amplia sua atuação com ações de autoestima, informação, empoderamento e geração de renda.",
            advantage: "É uma causa de compreensão imediata e impacto tangível, favorecendo campanhas mobilizadoras com colaboradores e clientes e uma narrativa social fácil de demonstrar.",
          },
          {
            name: "Banco de Lenços Flávia Flores",
            slug: "banco-de-lencos",
            logo: "",
            logoAlt: "Banco de Lenços Flávia Flores",
            logoWidth: 0,
            logoHeight: 0,
            url: "https://www.quimioterapiaebeleza.org.br/Banco-de-Len%C3%A7os.html",
            esg: "Social · acolhimento, pertencimento e voluntariado",
            description: "Unidade de ação do Instituto Quimioterapia & Beleza que arrecada, higieniza e doa lenços gratuitamente para mulheres em tratamento oncológico.",
            advantage: "A doação material vira uma ativação coletiva simples de participar, aproximando pessoas da causa e fortalecendo uma cultura interna de solidariedade e voluntariado.",
          },
          {
            name: "Instituto ABIHPEC · De Bem com Você",
            slug: "abihpec",
            logo: "./assets/images/partners/abihpec.webp",
            logoAlt: "Logotipo do programa De Bem com Você do Instituto ABIHPEC",
            logoWidth: 493,
            logoHeight: 380,
            url: "https://institutoabihpec.org.br/debemcomvc/",
            esg: "Social · saúde, autoestima e voluntariado",
            description: "Promove oficinas gratuitas de cuidados pessoais para pessoas em tratamento oncológico, com foco em autoestima, bem-estar emocional e dignidade.",
            advantage: "A conexão entre beleza, autocuidado e oncologia torna a agenda social especialmente coerente para marcas do setor, aumentando a autenticidade percebida da atuação ESG.",
          },
          {
            name: "Hora Luterana · Hora Produções",
            slug: "hora-producoes",
            logo: "./assets/images/partners/hora-producoes.webp",
            logoAlt: "Logotipo da Hora Produções",
            logoWidth: 499,
            logoHeight: 199,
            url: "https://www.horaluterana.org.br/a-hora-producoes",
            esg: "Social · acolhimento, esperança e conteúdo",
            description: "Produz materiais de comunicação cristã com linguagem acessível e foco em fé, esperança, acolhimento e conexão com diferentes públicos.",
            advantage: "A capacidade editorial e a comunicação humanizada podem ampliar a força de mensagens de acolhimento e aproximar a causa de comunidades que valorizam vínculos e apoio emocional.",
          },
          {
            name: "Sociedade Bíblica do Brasil",
            slug: "sbb",
            logo: "./assets/images/partners/sbb.webp",
            logoAlt: "Logotipo da Sociedade Bíblica do Brasil",
            logoWidth: 760,
            logoHeight: 287,
            url: "https://www.sbb.org.br/",
            esg: "Social · assistência, inclusão e desenvolvimento humano",
            description: "Entidade sem fins lucrativos que, além de sua missão bíblica, desenvolve programas de impacto social e assistência a comunidades em situação de vulnerabilidade.",
            advantage: "A capilaridade institucional e a experiência social da organização podem ampliar o alcance da causa e reforçar legitimidade junto a comunidades e redes de apoio diversas.",
          },
          {
            name: "Antilhas Embalagens & Soluções",
            slug: "antilhas",
            logo: "./assets/images/partners/antilhas.webp",
            logoAlt: "Logotipo da Antilhas Embalagens & Soluções",
            logoWidth: 760,
            logoHeight: 246,
            url: "https://antilhas.com.br/",
            esg: "Ambiental + Social · sustentabilidade e apoio comunitário",
            description: "Empresa de embalagens e logística que declara propósito de impacto positivo e mantém certificações ligadas a qualidade, meio ambiente, segurança e responsabilidade social.",
            advantage: "O apoio a uma causa social complementa uma agenda ambiental já estruturada, ajudando a comunicar ESG de forma mais equilibrada entre impacto ambiental e impacto humano.",
          },
        ],
        previous: [],
      };
      function mediaImg({ src, alt, width, height, className = "", priority = false }) {
        return `<img src="${esc(src)}" alt="${esc(alt)}"${width ? ` width="${width}"` : ""}${height ? ` height="${height}"` : ""} class="${esc(className)}" loading="${priority ? "eager" : "lazy"}" decoding="async"${priority ? ' fetchpriority="high" data-priority' : ""}>`;
      }
      function partnerLogo(partner, compact = false) {
        if (partner.logo)
          return mediaImg({
            src: partner.logo,
            alt: partner.logoAlt || `Logotipo de ${partner.name}`,
            width: partner.logoWidth,
            height: partner.logoHeight,
            className: compact ? "partner-logo compact" : "partner-logo",
          });
        return `<span class="partner-text-logo ${compact ? "compact" : ""}" aria-label="${esc(partner.name)}"><strong>Banco de Lenços</strong><small>Flávia Flores</small></span>`;
      }
      function partnerCards(records) {
        return records
          .map(
            (partner) =>
              `<article class="partner-card reveal"><a class="partner-logo-slot partner-site-link" href="${esc(partner.url)}" target="_blank" rel="noopener noreferrer" data-partner-site="${esc(partner.name)}" aria-label="Abrir site oficial de ${esc(partner.name)} em nova aba">${partnerLogo(partner)}</a><div class="partner-card-copy"><span class="pill">${esc(partner.esg)}</span><h3>${esc(partner.name)}</h3><p>${esc(partner.description)}</p><div class="partner-value"><strong>Vantagem competitiva potencial</strong><p>${esc(partner.advantage)}</p></div><a class="btn plain partner-official" href="${esc(partner.url)}" target="_blank" rel="noopener noreferrer" data-partner-site="${esc(partner.name)}">Visitar site oficial <span aria-hidden="true">↗</span></a></div></article>`,
          )
          .join("");
      }
      function partnerDockItems() {
        return partnerRecords.current
          .map(
            (partner) =>
              `<a class="partner-dock-item" href="${esc(partner.url)}" target="_blank" rel="noopener noreferrer" data-partner-site="${esc(partner.name)}" title="${esc(partner.name)}"><span class="partner-dock-logo">${partnerLogo(partner, true)}</span><span>${esc(partner.name.replace("Instituto ABIHPEC · ", "").replace("Hora Luterana · ", ""))}</span></a>`,
          )
          .join("");
      }
      function renderPartnerDock() {
        const dock = $("#partner-dock-grid");
        if (dock) dock.innerHTML = partnerDockItems();
      }
      function partnerImpactPanel() {
        return `<section class="partner-impact-section"><div class="wrap"><div class="partner-impact reveal"><div class="partner-impact-copy"><div class="eyebrow">Parcerias que deixam marca</div><h2>Quando uma empresa apoia uma causa, o impacto também volta em forma de <em>confiança.</em></h2><p>Inspirado no modelo visual de “nossos números”: informação objetiva, leitura rápida e uma composição mais viva. Aqui, os indicadores não inventam resultados do Instituto — mostram a estrutura da rede e os benefícios estratégicos potenciais para quem apoia.</p></div><div class="partner-impact-grid" aria-label="Síntese da rede de parceiros"><div class="impact-stat"><strong>7</strong><span>organizações apresentadas nesta rede</span></div><div class="impact-stat"><strong>ESG</strong><span>o pilar Social ganha evidência e narrativa</span></div><div class="impact-stat"><strong>+ vínculo</strong><span>o apoio cria oportunidades de engajamento interno</span></div><div class="impact-stat"><strong>+ confiança</strong><span>propósito coerente pode fortalecer reputação</span></div></div><p class="impact-note">Benefícios estratégicos potenciais. A comprovação de impacto deve ser sustentada por metas, indicadores e prestação de contas da parceria.</p></div></div></section>`;
      }
      function partnershipsPage() {
        return (
          head(
            "Juntos, fazemos<br>mais <em>caminhos.</em>",
            "Conheça as organizações parceiras, acesse seus canais oficiais e entenda como o apoio a uma instituição pode gerar valor social e reputacional de forma responsável.",
            "Rede de parcerias",
            [["Nossos parceiros"]],
          ) +
          partnerImpactPanel() +
          section(
            `<div class="section-head"><div><div class="eyebrow">Rede apresentada</div><h2>Parceiros que ajudam<br>a causa a <em>avançar.</em></h2></div><p class="muted">As vantagens abaixo são leituras estratégicas potenciais baseadas na atuação pública de cada organização e no valor ESG de apoiar uma causa social.</p></div><div class="partner-list">${partnerCards(partnerRecords.current)}</div>`,
            "white",
          ) +
          section(
            `<div class="section-head"><div><div class="eyebrow">Por que isso importa para empresas</div><h2>ESG que sai do discurso<br>e entra na <em>experiência.</em></h2></div><p class="muted">O valor cresce quando a parceria tem objetivo, participação e evidência.</p></div><div class="grid g4 esg-benefits"><article class="card reveal"><span class="benefit-index">01</span><h3>Reputação e confiança</h3><p>Uma parceria coerente com o posicionamento da empresa pode reforçar legitimidade e demonstrar compromisso social de forma visível.</p></article><article class="card reveal"><span class="benefit-index">02</span><h3>Engajamento interno</h3><p>Campanhas, voluntariado e ativações criam pontos concretos de participação para colaboradores, fortalecendo senso de propósito.</p></article><article class="card reveal"><span class="benefit-index">03</span><h3>Relacionamento com públicos</h3><p>A causa abre conversas relevantes com clientes, comunidades e parceiros sem reduzir ESG a uma peça promocional isolada.</p></article><article class="card reveal"><span class="benefit-index">04</span><h3>Evidência para ESG</h3><p>Metas, participação e resultados podem alimentar relatórios de sustentabilidade e governança quando documentados com transparência.</p></article></div><div class="partner-cta reveal"><div><h2>Sua organização também pode fazer parte.</h2><p>Estruture uma parceria com objetivo, contrapartidas responsáveis, indicadores e prestação de contas desde o início.</p></div>${link("Quero propor parceria", "/participar/parceria-estrategica")}</div>`,
          )
        );
      }
      function homeNumbers() {
        return `<section class="home-numbers-section"><div class="wrap"><div class="home-numbers reveal"><div class="home-numbers-head"><div><div class="eyebrow">Nossa rede em movimento</div><h2>Um retrato rápido do que já está <em>estruturado.</em></h2></div><p>Composição inspirada na referência “Nossos números”, usando somente marcos já presentes no protótipo e dados da rede informada.</p></div><div class="home-numbers-grid"><div class="number-item"><strong>2020</strong><span>marco de início do grupo de apoio apresentado no projeto</span></div><div class="number-item"><strong>3</strong><span>histórias citadas no material: Taty, Patrícia e Josi</span></div><div class="number-item"><strong>7</strong><span>organizações parceiras apresentadas nesta versão</span></div><div class="number-item"><strong>3 frentes</strong><span>informação, acolhimento e mobilização organizam a experiência</span></div></div><p class="numbers-note">Indicadores de atendimento, alcance e impacto social continuam dependentes de validação e mensuração oficial do Instituto.</p></div></div></section>`;
      }
      function home() {
        return `<section class="hero"><div class="wrap hero-grid"><div><div class="eyebrow">Instituto Doses de Amor</div><h1 tabindex="-1">Pequenos gestos.<br>Grandes doses<br>de <em>amor.</em></h1><p class="lead muted">Um convite para acolher, se informar e fazer parte de uma rede de solidariedade em torno do câncer de mama.</p><div class="btn-row">${link("Quero ajudar", "/ajudar")}${link("Conheça o Instituto", "/sobre", "secondary")}</div><div class="hero-foot"><span class="mini-heart" aria-hidden="true">♡</span> Cada pessoa encontra seu jeito de fazer parte.</div></div><div class="hero-art"><div class="hero-mosaic hero-brand-visual reveal" aria-label="Composição visual do Instituto Doses de Amor"><img src="./assets/images/doses-logo.png" width="264" height="148" alt="Instituto Doses de Amor" loading="eager" decoding="async" fetchpriority="high" data-priority><span class="visual-chip visual-chip-a">Acolhimento</span><span class="visual-chip visual-chip-b">Informação</span><span class="visual-chip visual-chip-c">Mobilização</span><div class="visual-line" aria-hidden="true"></div><div class="hero-brand-caption"><span class="photo-kicker">Comunidade em movimento</span><strong>O acolhimento também se revela em estar junto.</strong></div></div><div class="hero-impact" aria-label="Marcos da trajetória do Instituto"><div class="hero-impact-item"><span class="hero-impact-label">Desde</span><strong>2020</strong><small>início do grupo de apoio</small></div><div class="hero-impact-item"><span class="hero-impact-label">Histórias</span><strong>3 mulheres</strong><small>Taty · Patrícia · Josi</small></div><div class="hero-impact-item"><span class="hero-impact-label">Registros</span><strong>2023–25</strong><small>fluxo financeiro apresentado</small></div><div class="hero-impact-note">Marcos da apresentação institucional. Indicadores de atendimento e alcance aguardam validação oficial.</div></div></div></div></section>
  <div class="path-strip"><div class="wrap">${[
    ["book", "Busco informação", "Entenda o câncer de mama", "/cancer"],
    ["hand", "Quero contribuir", "Encontre sua forma de ajudar", "/ajudar"],
    ["mail", "Quero falar com vocês", "Acesse o contato", "/contato"],
  ]
    .map(
      ([i, t, d, p]) =>
        `<a href="#${p}" class="path-item">${icon(i)}<div><strong>${t}</strong><span class="small">${d}</span></div><span class="path-arrow" aria-hidden="true">↗</span></a>`,
    )
    .join("")}</div></div>
  ${homeNumbers()}
  ${section(`<div class="section-head"><div><div class="eyebrow">Atividades e projetos</div><h2>Várias formas de<br>fazer parte da <em>rede.</em></h2></div><p class="muted">Explore as propostas de acolhimento, informação e mobilização em um só lugar. A realização de cada atividade precisa ser confirmada pelo Instituto.</p></div><div class="filter-row" aria-label="Filtrar atividades e projetos">${["Todas", "Acolhimento", "Informação", "Mobilização"].map((t) => `<button class="filter" data-filter="${t}" aria-pressed="${t === activityFilter}">${t}</button>`).join("")}</div><p class="small muted" id="filter-status" role="status">${activities.length} propostas de estrutura</p><div class="grid g2" id="activity-grid">${activityCards(activities)}</div><div class="btn-row">${link("Ver atividades e projetos", "/atividades", "secondary")}</div>`, "home-activities")}
  ${section(`<div class="story-panel"><div class="quote-art" aria-hidden="true"><p>O amor ganha força<br>quando é<br><i>compartilhado.</i></p><span>Doses de Amor</span></div><div><div class="eyebrow">Conheça o Instituto</div><h2>Uma causa.<br>Muitas formas de<br>estar <em>junto.</em></h2><p class="muted">Este espaço aproxima quem busca informação e quem deseja contribuir com o Instituto Doses de Amor.</p><p class="small muted">A história, a missão e os serviços do Instituto serão apresentados após validação da equipe.</p>${link("Sobre o Doses de Amor", "/sobre", "plain")}</div></div>`, "white")}
  ${section(
    `<div class="section-head"><div><div class="eyebrow">Informação que aproxima</div><h2>Conhecer é um passo<br>para se <em>cuidar.</em></h2></div><p class="muted">Conteúdo educativo com referências oficiais, em linguagem simples.</p></div><div class="grid g3">${[
      [
        "book",
        "O que é o câncer de mama",
        "Uma introdução para entender a doença e encontrar informação confiável.",
        "/cancer/o-que-e",
      ],
      [
        "ribbon",
        "Mamografia",
        "Entenda a finalidade do exame e onde consultar as orientações oficiais.",
        "/cancer/mamografia",
      ],
      [
        "hand",
        "Direitos do paciente",
        "Encontre referências para conversar sobre direitos e apoio social.",
        "/cancer/direitos",
      ],
    ]
      .map(
        ([i, t, d, p]) =>
          `<article class="card">${icon(i)}<h3>${t}</h3><p>${d}</p>${link("Saiba mais", p, "plain")}</article>`,
      )
      .join("")}</div>`,
  )}
  ${section(`<div class="section-head"><div><div class="eyebrow">Faça parte</div><h2>Seu jeito de ajudar<br>também tem <em>valor.</em></h2></div>${link("Ver todas as formas", "/ajudar", "plain")}</div><div class="grid g3">${[helpWays[2], helpWays[3]].map((w) => `<article class="card">${icon(w.icon)}<h3>${w.title}</h3><p>${w.desc}</p>${link(w.cta, "/ajudar/" + w.slug, "plain")}</article>`).join("")}<article class="card">${icon("building")}<h3>Nossos parceiros</h3><p>Conheça as organizações que caminham ou já caminharam ao lado do Instituto.</p>${link("Conhecer parceiros", "/parcerias", "plain")}</article></div>`, "pink")}
  ${section(`<div class="section-head"><div><div class="eyebrow">Notícias do Instituto</div><h2>Acompanhe o que<br>vem por <em>aí.</em></h2></div>${link("Ir para notícias", "/sobre/noticias", "plain")}</div><div class="empty">${icon("book")}<h3>Um espaço para nossas próximas histórias</h3><p>As notícias serão publicadas aqui quando houver conteúdo aprovado pelo Instituto.</p>${link("Conheça o espaço de notícias", "/sobre/noticias", "secondary")}</div>`, "white")}${banner()}`;
      }
      function about() {
        return (
          head(
            "Um convite para<br>estar <em>junto.</em>",
            "Conheça o espaço do Instituto Doses de Amor: sua história, as pessoas que fazem parte e as formas de se conectar.",
            "Sobre nós",
            [["Sobre nós"]],
            `<nav class="section-nav" aria-label="Sobre nós"><a aria-current="page" href="#/sobre">O Instituto</a><a href="#/sobre/time">Time</a><a href="#/sobre/noticias">Notícias</a></nav>`,
          ) +
          section(
            `<div class="story-panel"><div><h2>O Instituto Doses de Amor</h2><p>Este protótipo organiza a apresentação do Instituto e facilita o acesso à informação sobre câncer de mama e às possibilidades de contribuição.</p>${pending("História, data de fundação, missão, abrangência e serviços aguardam informações oficiais do Instituto. Nenhum desses dados foi presumido.")}<h3>O que você pode encontrar aqui</h3><ul class="line-list"><li><span class="num">01</span><p><strong>Informação</strong>Conteúdo educativo com referências oficiais.</p></li><li><span class="num">02</span><p><strong>Participação</strong>Caminhos para apoiar com recursos, tempo ou divulgação.</p></li><li><span class="num">03</span><p><strong>Conexão</strong>Um espaço para apresentar dúvidas e propostas ao Instituto.</p></li></ul></div><div class="quote-art" aria-hidden="true"><p>Há muitas formas<br>de doar.<br><i>Há muitas formas<br>de amar.</i></p><span>Proposta de mensagem institucional</span></div></div>`,
            "white",
          ) +
          section(
            `<div class="grid g2"><article class="card">${icon("people")}<h2>Quem faz parte</h2><p>Um espaço dedicado às pessoas por trás do Instituto.</p>${link("Conheça o espaço do time", "/sobre/time", "plain")}</article><article class="card">${icon("book")}<h2>Histórias e notícias</h2><p>Acompanhe as publicações aprovadas pela equipe.</p>${link("Visite notícias", "/sobre/noticias", "plain")}</article></div>`,
          ) +
          banner()
        );
      }
      function team() {
        return (
          head(
            "Pessoas que dão<br>sentido à <em>causa.</em>",
            "Um espaço para conhecer as pessoas que fazem parte do Doses de Amor.",
            "Nosso time",
            [["Sobre nós", "/sobre"], ["Time"]],
            `<nav class="section-nav" aria-label="Sobre nós"><a href="#/sobre">O Instituto</a><a aria-current="page" href="#/sobre/time">Time</a><a href="#/sobre/noticias">Notícias</a></nav>`,
          ) +
          section(
            `${pending("Nomes, cargos, fotografias e biografias não foram fornecidos. O bloco abaixo demonstra a estrutura de um perfil e não representa uma pessoa real.")}<div class="grid g2"><article class="demo-block"><span class="skeleton-avatar" aria-hidden="true"><svg viewBox="0 0 24 24">${shapes.person}</svg></span>${tag("Modelo de perfil")}<h2 style="font-size:1.5rem;margin-top:18px">Nome a confirmar</h2><p class="muted">Função e atuação a confirmar</p><div class="placeholder-line" aria-hidden="true"></div><div class="placeholder-line short" aria-hidden="true"></div><p class="small muted">A biografia deverá ser aprovada pela pessoa apresentada e pelo Instituto.</p>${link("Abrir modelo de perfil", "/sobre/time/perfil", "plain")}</article><div><h2>Conheça quem constrói<br>essa <em>história.</em></h2><p class="muted">Cada perfil poderá apresentar a função, a trajetória e o vínculo com o Instituto, com autorização de uso de imagem.</p>${link("Fale com o Instituto", "/contato", "secondary")}</div></div>`,
            "white",
          )
        );
      }
      function profile() {
        return (
          head(
            "Modelo de perfil",
            "Estrutura de apresentação individual. Nenhuma pessoa real está representada neste modelo.",
            "Time · modelo",
            [
              ["Sobre nós", "/sobre"],
              ["Time", "/sobre/time"],
              ["Modelo de perfil"],
            ],
          ) +
          section(
            `<div class="reading-layout"><article><span class="skeleton-avatar" aria-hidden="true"><svg viewBox="0 0 24 24">${shapes.person}</svg></span><h2>Nome a confirmar</h2><p class="muted">Cargo ou função a confirmar</p>${pending("Inserir biografia, vínculo com o Instituto e fotografia autorizada. Não foram criados nomes ou credenciais.")}<h3>Trajetória e atuação</h3><p>Espaço reservado para uma apresentação aprovada pela equipe.</p>${link("Voltar para o time", "/sobre/time", "secondary")}</article><aside class="aside-card"><h2>Faça uma conexão</h2><p>O contato institucional é o caminho proposto para mensagens destinadas ao time.</p>${link("Ir para contato", "/contato", "primary")}</aside></div>`,
            "white",
          )
        );
      }
      function news() {
        return (
          head(
            "Histórias que<br>merecem ser <em>compartilhadas.</em>",
            "Publicações, novidades e comunicados do Doses de Amor.",
            "Notícias",
            [["Sobre nós", "/sobre"], ["Notícias"]],
            `<nav class="section-nav" aria-label="Sobre nós"><a href="#/sobre">O Instituto</a><a href="#/sobre/time">Time</a><a aria-current="page" href="#/sobre/noticias">Notícias</a></nav>`,
          ) +
          section(
            `<div class="empty">${icon("book")}<h2>Nenhuma notícia validada ainda</h2><p>Este espaço receberá as publicações oficiais. O modelo abaixo permite avaliar a leitura de uma notícia, sem criar acontecimentos ou depoimentos.</p>${link("Visualizar modelo de notícia", "/sobre/noticias/modelo", "secondary")}</div>`,
            "white",
          ) +
          banner()
        );
      }
      function newsModel() {
        return (
          head(
            "Título da notícia<br>a <em>validar.</em>",
            "Modelo de página editorial — sem acontecimento, data ou autoria fictícios.",
            "Notícias · modelo",
            [
              ["Sobre nós", "/sobre"],
              ["Notícias", "/sobre/noticias"],
              ["Modelo de notícia"],
            ],
          ) +
          section(
            `<div class="reading-layout"><article>${tag("Modelo de conteúdo")}<div class="news-cover" aria-hidden="true" style="margin:25px 0">♡</div><p class="small muted">Imagem e legenda a validar · Autoria e data a confirmar</p><h2>Uma leitura clara, do início ao fim</h2><p>Este bloco será substituído pelo texto aprovado da notícia. A estrutura prevê um resumo inicial, parágrafos curtos, subtítulos e informações de contexto.</p><h3>Espaço para o conteúdo principal</h3><p>Somente fatos confirmados, fotografias autorizadas e fontes identificadas deverão entrar na publicação.</p><div class="note">O modelo não retrata uma ação realizada pelo Instituto.</div>${link("Voltar para notícias", "/sobre/noticias", "secondary")}</article><aside class="aside-card"><h2>Continue explorando</h2><a href="#/atividades">Nossas atividades</a><a href="#/sobre">Sobre o Instituto</a><a href="#/ajudar">Como ajudar</a></aside></div>`,
            "white",
          )
        );
      }
      const cancerNav = (active) =>
        `<nav class="section-nav" aria-label="Temas sobre câncer de mama">${[
          ["Visão geral", "/cancer"],
          ["O que é", "/cancer/o-que-e"],
          ["Mamografia", "/cancer/mamografia"],
          ["Direitos do paciente", "/cancer/direitos"],
        ]
          .map(
            ([t, p]) =>
              `<a href="#${p}" ${active === p ? 'aria-current="page"' : ""}>${t}</a>`,
          )
          .join("")}</nav>`;
      function cancer() {
        return (
          head(
            "Informação para<br>cuidar com <em>consciência.</em>",
            "Encontre uma introdução ao câncer de mama, ao exame de mamografia e às referências sobre direitos do paciente.",
            "Câncer de mama",
            [["Câncer de mama"]],
            cancerNav("/cancer"),
          ) +
          section(
            `<div class="grid g3">${[
              [
                "O que é o câncer de mama",
                "Entenda o significado da doença e encontre fontes para continuar a leitura.",
                "book",
                "/cancer/o-que-e",
              ],
              [
                "Mamografia",
                "Conheça o exame e como conversar com profissionais de saúde.",
                "ribbon",
                "/cancer/mamografia",
              ],
              [
                "Direitos do paciente",
                "Saiba onde buscar orientações oficiais sobre direitos sociais.",
                "hand",
                "/cancer/direitos",
              ],
            ]
              .map(
                ([t, d, i, p]) =>
                  `<article class="card">${icon(i)}<h2 style="font-size:1.6rem">${t}</h2><p>${d}</p>${link("Ler sobre o tema", p, "plain")}</article>`,
              )
              .join(
                "",
              )}</div><div class="note">Conteúdo educativo resumido a partir de fontes oficiais consultadas em 22/10/2026. A avaliação de um profissional de saúde é necessária para decisões individuais.</div>`,
            "white",
          ) +
          section(
            `<h2>Dúvidas para começar</h2>${faq([
              [
                "Este conteúdo oferece um diagnóstico?",
                "<p>Não. Este espaço é educativo. Um diagnóstico depende de avaliação no serviço de saúde.</p>",
              ],
              [
                "O Instituto realiza exames ou tratamento?",
                "<p>Os serviços do Doses de Amor ainda precisam ser confirmados. Este protótipo não oferece agendamento de exames nem promete atendimento clínico.</p>",
              ],
              [
                "Onde posso continuar a leitura?",
                `<p>Consulte a <a href="${sources.cancer}" target="_blank" rel="noopener noreferrer">página do INCA sobre câncer de mama (abre em nova aba)</a>.</p>`,
              ],
            ])}`,
          )
        );
      }
      const articleContent = {
        "o-que-e": {
          title: "Entender é o<br>primeiro <em>passo.</em>",
          name: "O que é o câncer de mama",
          intro:
            "Uma introdução em linguagem simples, com referências do Instituto Nacional de Câncer.",
          html: `<h2>O que é o câncer de mama?</h2><p>O câncer de mama ocorre quando células da mama se multiplicam de maneira desordenada, formando um tumor maligno. Existem diferentes tipos da doença.</p><h2>Percebeu uma alteração?</h2><p>Alterações nas mamas devem ser avaliadas por um profissional de saúde. Somente uma investigação adequada pode esclarecer o que está acontecendo.</p><h2>Cada pessoa tem uma história</h2><p>O tratamento depende de fatores como o tipo do tumor e a fase da doença. A equipe de saúde é responsável por avaliar o caso e orientar as decisões.</p>`,
          faq: [
            [
              "Posso usar o site para saber se tenho câncer?",
              "<p>O site não realiza diagnóstico. Procure avaliação em um serviço de saúde para esclarecer alterações ou dúvidas sobre sua saúde.</p>",
            ],
          ],
          source: "ms",
        },
        mamografia: {
          title: "Mamografia:<br>informação com <em>cuidado.</em>",
          name: "Mamografia",
          intro:
            "Entenda o que é o exame e encontre orientações oficiais para conversar com sua equipe de saúde.",
          html: `<h2>O que é a mamografia?</h2><p>A mamografia usa raios X para produzir imagens das mamas. O exame pode identificar alterações suspeitas antes de elas serem percebidas ao toque.</p><h2>Quando fazer?</h2><p>As recomendações de rastreamento e a investigação de sintomas são situações diferentes. A indicação deve considerar as orientações oficiais e a avaliação da equipe de saúde.</p><p>Converse com um profissional sobre benefícios, riscos e a indicação do exame no seu caso. Consulte as recomendações atualizadas na fonte do INCA indicada abaixo.</p><h2>Como se orientar para o exame</h2><p>Confirme com o serviço de saúde o preparo e os documentos necessários. O resultado deve ser avaliado por um profissional.</p>`,
          faq: [
            [
              "O protótipo permite agendar mamografia?",
              "<p>Não há serviço de agendamento integrado. A disponibilidade de exames ou encaminhamentos pelo Instituto não foi confirmada.</p>",
            ],
            [
              "Um exame alterado confirma o diagnóstico?",
              "<p>Alterações precisam ser investigadas pela equipe de saúde. O exame de mamografia, isoladamente, não define o diagnóstico.</p>",
            ],
          ],
          source: "cancer",
        },
        direitos: {
          title: "Conhecer seus direitos<br>também é <em>cuidado.</em>",
          name: "Direitos do paciente",
          intro:
            "Referências oficiais para orientar sua busca por informação e apoio social.",
          html: `<h2>Por onde começar?</h2><p>O INCA reúne informações sobre direitos sociais da pessoa com câncer. As regras, os documentos e a possibilidade de acesso dependem de cada situação.</p><h2>Informação para sua conversa</h2><p>Entre os temas abordados pelo INCA estão benefícios previdenciários, FGTS e tratamento fora do domicílio. A existência de um diagnóstico não garante automaticamente todos os benefícios.</p><h2>Busque orientação para o seu caso</h2><p>O Serviço Social da unidade de tratamento pode orientar a busca por informações e os encaminhamentos necessários. Consulte os canais oficiais para verificar critérios e documentação.</p>`,
          faq: [
            [
              "O Instituto oferece assessoria jurídica?",
              "<p>Esse serviço não foi confirmado. O formulário de contato permite simular uma solicitação de informações sobre o Instituto.</p>",
            ],
            [
              "Onde consultar informações oficiais?",
              `<p>Acesse as <a href="${sources.rights}" target="_blank" rel="noopener noreferrer">perguntas frequentes do INCA sobre direitos sociais (abre em nova aba)</a>.</p>`,
            ],
          ],
          source: "rights",
        },
      };
      function healthArticle(slug) {
        const a = articleContent[slug];
        return (
          head(
            a.title,
            a.intro,
            "Câncer de mama",
            [["Câncer de mama", "/cancer"], [a.name]],
            cancerNav("/cancer/" + slug),
          ) +
          section(
            `<div class="reading-layout"><article>${a.html}<div class="note">Informação educativa. As decisões de saúde e a análise de direitos precisam considerar o seu caso com os profissionais e órgãos responsáveis.</div><h2>Dúvidas frequentes</h2>${faq(a.faq)}<div class="source"><strong>Fontes e revisão</strong><span> · Consulta em 22/10/2026</span><a href="${sources[a.source]}" target="_blank" rel="noopener noreferrer">${a.source === "ms" ? "Ministério da Saúde · Câncer de mama" : a.source === "rights" ? "INCA · Direitos sociais da pessoa com câncer" : "INCA · Câncer de mama — versão para a população"} (abre em nova aba)</a>${slug === "direitos" ? `<a href="${sources.book}" target="_blank" rel="noopener noreferrer">INCA · Orientações aos pacientes e familiares (abre em nova aba)</a>` : ""}<p>Revisão clínica ou jurídica final do conteúdo: pendente antes do lançamento institucional.</p></div></article><aside class="aside-card"><h2>Continue sua leitura</h2>${Object.entries(
              articleContent,
            )
              .filter(([k]) => k !== slug)
              .map(
                ([k, v]) =>
                  `<a href="#/cancer/${k}">${v.name} <span aria-hidden="true">↗</span></a>`,
              )
              .join(
                "",
              )}<a href="#/cancer">Voltar à visão geral</a><h2 style="margin-top:28px">Quer falar com o Instituto?</h2><p>Conheça o caminho de contato proposto.</p>${link("Fale conosco", "/contato", "secondary")}</aside></div>`,
            "white",
          )
        );
      }
      function ways() {
        return (
          head(
            "Há muitas formas<br>de doar <em>amor.</em>",
            "Com recursos, tempo, conhecimento ou divulgação, encontre o caminho que combina com você.",
            "Como ajudar",
            [["Como ajudar"]],
          ) +
          section(
            `<div class="section-head"><h2>Qual será o seu<br>próximo <em>gesto?</em></h2><p class="muted">Escolha uma das cinco possibilidades para conhecer os próximos passos.</p></div><div class="grid g3">${helpWays.map((w, i) => `<article class="card">${icon(w.icon)}<span class="card-number" aria-hidden="true">0${i + 1}</span><h2 style="font-size:1.5rem">${w.title}</h2><p>${w.desc}</p>${link(w.cta, "/ajudar/" + w.slug, "plain")}</article>`).join("")}</div>`,
            "white",
          ) +
          section(
            `<h2>Ainda não sabe como participar?</h2><p class="lead muted">Você pode começar com uma conversa sobre suas ideias e possibilidades.</p>${link("Ir para contato", "/contato", "secondary")}`,
          )
        );
      }
      function helpDetail(slug) {
        const w = helpWays.find((x) => x.slug === slug);
        if (!w) return notFound();
        let next = w.kind === "doar" ? "/doar" : "/participar/" + w.slug;
        return (
          head(w.title, w.desc, w.kicker, [
            ["Como ajudar", "/ajudar"],
            [w.title],
          ]) +
          section(
            `<div class="form-layout"><div><h2>Um caminho para<br>somar <em>forças.</em></h2><p class="lead">${w.what}</p>${w.kind === "share" ? shareUI() : `<ol class="step-list"><li><div><strong>${w.kind === "doar" ? "Escolha sua contribuição" : "Apresente sua ideia"}</strong>${w.kind === "doar" ? "Defina um valor e uma frequência." : "Conte como você ou sua empresa deseja participar."}</div></li><li><div><strong>Revise com tranquilidade</strong>Confira e edite antes de concluir.</div></li><li><div><strong>Veja a confirmação</strong>O protótipo confirma a simulação, sem envio ou cobrança.</div></li></ol><div class="btn-row">${link(w.kind === "doar" ? "Simular uma doação" : w.cta, next)}</div>`}<div class="note">${w.kind === "share" ? "A mensagem é uma sugestão de divulgação. Revise o texto e use somente canais e campanhas oficiais." : "Valores, condições, vagas, contrapartidas e prazos precisam ser definidos com o Doses de Amor. Nenhuma parceria é formalizada por este protótipo."}</div></div><aside class="aside-card">${icon(w.icon)}<h2>Seu apoio, do seu jeito</h2><p>Explore outras formas de fazer parte dessa causa.</p>${helpWays
              .filter((x) => x.slug !== slug)
              .slice(0, 3)
              .map((x) => `<a href="#/ajudar/${x.slug}">${x.title}</a>`)
              .join(
                "",
              )}<a href="#/ajudar">Ver todas as formas</a></aside></div>`,
            "white",
          )
        );
      }
      const shareText =
        "Conheça o Instituto Doses de Amor. Há muitas formas de contribuir: com doações, tempo, conhecimento ou divulgação. Procure os canais oficiais do Instituto para saber mais.";
      function shareUI() {
        return `<div class="share-box" id="share-copy">${shareText}</div><div class="btn-row"><button class="btn primary" data-action="copy-share">Copiar mensagem <span aria-hidden="true">↗</span></button><button class="btn secondary" data-action="native-share">Compartilhar</button></div><p class="small muted" id="share-status" role="status">O link deste protótipo privado não será incluído na mensagem.</p>`;
      }
      function activityCards(list) {
        return list
          .map(
            (a) =>
              `<article class="card activity-card"><div class="activity-art" aria-hidden="true">${icon(a.icon)}</div><div class="card-body"><div style="margin-bottom:17px">${tag("Proposta · " + a.category)}</div><h3>${a.title}</h3><p>${a.desc}</p>${link("Explorar proposta", "/atividades/" + a.slug, "plain")}</div></article>`,
          )
          .join("");
      }
      let activityFilter = "Todas";
      function activitiesPage() {
        let list = activities.filter(
          (a) => activityFilter === "Todas" || a.category === activityFilter,
        );
        return (
          head(
            "Encontros, gestos<br>e <em>possibilidades.</em>",
            "Um espaço para conhecer e participar das atividades do Instituto. As categorias abaixo são propostas de organização.",
            "Nossas atividades",
            [["Nossas atividades"]],
          ) +
          section(
            `${pending("Não foi fornecida uma agenda real. As atividades abaixo são modelos de estrutura a confirmar com o Instituto, sem datas, locais ou serviços prometidos.")}<h2>Explore por interesse</h2><div class="filter-row" aria-label="Filtrar propostas de atividades">${["Todas", "Acolhimento", "Informação", "Mobilização"].map((t) => `<button class="filter" data-filter="${t}" aria-pressed="${t === activityFilter}">${t}</button>`).join("")}</div><p class="small muted" id="filter-status" role="status">${list.length} proposta${list.length !== 1 ? "s" : ""} de estrutura</p><div class="grid g2" id="activity-grid">${activityCards(list)}</div>`,
            "white",
          ) +
          banner()
        );
      }
      function activityDetail(slug) {
        const a = activities.find((x) => x.slug === slug);
        if (!a) return notFound();
        return (
          head(a.title, a.desc, "Proposta de atividade", [
            ["Nossas atividades", "/atividades"],
            [a.title],
          ]) +
          section(
            `<div class="reading-layout"><article>${tag("Modelo · realização a confirmar")}<h2 style="margin-top:30px">Sobre esta proposta</h2><p>Esta página demonstra como uma atividade poderá ser apresentada. Objetivos, responsáveis, público e condições de participação deverão ser definidos e aprovados pelo Instituto.</p><dl class="review"><div><dt>Categoria proposta</dt><dd>${a.category}</dd></div><div><dt>Data e horário</dt><dd>A confirmar</dd></div><div><dt>Formato e local</dt><dd>A confirmar</dd></div><div><dt>Participação</dt><dd>Critérios a confirmar</dd></div></dl><div class="note">Não há evento agendado ou inscrição real nesta versão.</div>${link("Voltar às atividades", "/atividades", "secondary")}</article><aside class="aside-card"><h2>Tem interesse?</h2><p>Simule uma mensagem sobre essa possibilidade.</p>${link("Demonstrar interesse", "/contato?assunto=atividades", "primary")}</aside></div>`,
            "white",
          )
        );
      }
      // Form state exists only in memory; no local storage, cookies or network submission.
      const formDrafts = {};
      const donation = {
        step: 1,
        frequency: "unica",
        amount: "60",
        custom: "",
        confirm: false,
      };
      let activeForm = null;
      function steps(labels, current) {
        return `<ol class="steps" aria-label="Etapas">${labels.map((t, i) => `<li class="${i + 1 === current ? "current" : i + 1 < current ? "done" : ""}" ${i + 1 === current ? 'aria-current="step"' : ""}><span aria-hidden="true">${i + 1 < current ? "✓" : i + 1}</span>${t}</li>`).join("")}</ol>`;
      }
      function field(id, label, opts = {}) {
        let value = opts.value ?? "",
          required = opts.required !== false;
        return `<div class="field"><label for="${id}">${label}${required ? ' <span class="small">(obrigatório)</span>' : ' <span class="small">(opcional)</span>'}</label>${opts.options ? `<select id="${id}" name="${id}" ${required ? "required" : ""} ${opts.help ? `aria-describedby="${id}-help"` : ""}>${opts.options.map(([v, t]) => `<option value="${esc(v)}" ${v === value ? "selected" : ""}>${t}</option>`).join("")}</select>` : opts.area ? `<textarea id="${id}" name="${id}" ${required ? "required" : ""} maxlength="${opts.max || 1800}" ${opts.help ? `aria-describedby="${id}-help"` : ""} ${opts.placeholder ? `placeholder="${esc(opts.placeholder)}"` : ""}>${esc(value)}</textarea>` : `<input id="${id}" name="${id}" type="${opts.type || "text"}" value="${esc(value)}" ${required ? "required" : ""} ${opts.type === "email" ? 'autocomplete="email" inputmode="email"' : opts.autocomplete ? `autocomplete="${opts.autocomplete}"` : ""} ${opts.help ? `aria-describedby="${id}-help"` : ""} ${id === "custom-amount" ? 'inputmode="decimal"' : ""} ${opts.max ? `maxlength="${opts.max}"` : ""}>`}${opts.help ? `<small id="${id}-help">${opts.help}</small>` : ""}<small class="error-text" id="${id}-error" hidden></small></div>`;
      }
      function consent(checked = false) {
        return `<div class="field"><label class="check-label" for="consent"><input type="checkbox" id="consent" name="consent" required ${checked ? "checked" : ""}><span>Entendi que este formulário não envia meus dados. Eles ficam temporariamente nesta página e são apagados ao sair. Li o <a href="#/privacidade" target="_blank" rel="noopener noreferrer">aviso de privacidade (abre em nova aba)</a>.</span></label><small class="error-text" id="consent-error" hidden></small></div>`;
      }
      function resetErrors(form) {
        $$("[aria-invalid]", form).forEach((el) => {
          el.removeAttribute("aria-invalid");
          const describedBy = (el.getAttribute("aria-describedby") || "")
            .split(" ")
            .filter((id) => id && !id.endsWith("-error"));
          if (describedBy.length)
            el.setAttribute("aria-describedby", describedBy.join(" "));
          else el.removeAttribute("aria-describedby");
        });
        $$(".error-text", form).forEach((el) => {
          el.hidden = true;
          el.textContent = "";
        });
        $$(".field", form).forEach((el) =>
          el.classList.remove("has-error", "feedback-pulse"),
        );
        $(".error-summary", form)?.remove();
      }
      function validate(form) {
        resetErrors(form);
        let errors = [];
        for (const el of $$("input,select,textarea", form)) {
          if (el.type === "radio" || el.disabled) continue;
          let message = "";
          if (
            el.required &&
            ((el.type === "checkbox" && !el.checked) ||
              (el.type !== "checkbox" && !el.value.trim()))
          )
            message =
              el.type === "checkbox"
                ? "Confirme a leitura para continuar."
                : "Preencha este campo.";
          else if (
            el.type === "email" &&
            el.value &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())
          )
            message = "Informe um e-mail válido, como nome@exemplo.com.";
          else if (el.type === "tel" && el.value.trim()) {
            const digits = el.value.replace(/\D/g, "");
            if (digits.length < 10 || digits.length > 15)
              message = "Informe o DDD e um telefone com 10 a 15 dígitos.";
          } else if (el.id === "custom-amount" && !validAmount(el.value))
            message =
              "Informe um valor entre R$ 1,00 e R$ 1.000.000,00, com até duas casas decimais.";
          if (message) {
            errors.push({ el, message });
            el.setAttribute("aria-invalid", "true");
            const msg = $("#" + el.id + "-error", form);
            if (msg) {
              msg.hidden = false;
              msg.textContent = message;
              let hints = (el.getAttribute("aria-describedby") || "")
                .split(" ")
                .filter(Boolean)
                .filter((x) => !x.endsWith("-error"));
              el.setAttribute("aria-describedby", [...hints, msg.id].join(" "));
            }
          }
        }
        if (errors.length) {
          const summary = document.createElement("div");
          summary.className = "error-summary";
          summary.tabIndex = -1;
          summary.setAttribute("role", "alert");
          summary.innerHTML = `<strong>Confira ${errors.length === 1 ? "o campo indicado" : "os " + errors.length + " campos indicados"} para continuar.</strong><ul>${errors.map((e) => `<li><a href="#${e.el.id}" data-error-target="${e.el.id}">${esc($(`label[for="${e.el.id}"]`, form)?.textContent.split("(")[0].trim() || "Confirmação")}: ${e.message}</a></li>`).join("")}</ul>`;
          form.prepend(summary);
          summary.focus();
          errors.forEach(({ el, message }) => setFieldFeedback(el, message, { quiet: true }));
          announce(`${errors.length} ${errors.length === 1 ? "campo precisa" : "campos precisam"} de atenção.`, "error");
          return false;
        }
        return true;
      }
      const readForm = (form) =>
        Object.fromEntries(new FormData(form).entries());
      function contact() {
        let d =
          formDrafts.contact ||
          (formDrafts.contact = {
            step: 1,
            data: {
              subject:
                new URLSearchParams(location.hash.split("?")[1] || "").get(
                  "assunto",
                ) || "",
            },
          });
        if (d.step === 3) {
          d.step = 1;
          d.data = {};
        }
        const intent = new URLSearchParams(
          location.hash.split("?")[1] || "",
        ).get("assunto");
        if (intent && !d.data.subject) d.data.subject = intent;
        activeForm = { type: "contact", draft: d };
        return (
          head(
            "Vamos<br><em>conversar?</em>",
            "Use este espaço para apresentar dúvidas, ideias ou propostas ao Instituto.",
            "Contato",
            [["Contato"]],
          ) +
          section(
            `<div class="form-layout"><div class="form-shell" id="flow-panel">${contactPanel(d)}</div><aside><div class="eyebrow">Uma conexão começa aqui</div><h2>Encontre seu<br>próximo <em>passo.</em></h2><p class="muted">Para conhecer oportunidades, visite as formas de ajudar e as atividades propostas.</p>${link("Como posso ajudar", "/ajudar", "plain")}${pending("E-mail, telefone, endereço, redes sociais e horário de atendimento aguardam confirmação. Não foram criados contatos fictícios.")}<p class="small muted">Este formulário não deve receber laudos, documentos ou informações de saúde. O canal não realiza atendimento de urgência.</p></aside></div>`,
            "white",
          )
        );
      }
      function contactPanel(d) {
        if (d.step === 3)
          return donePanel(
            "Mensagem revisada",
            "Seu rascunho está pronto para ser copiado e enviado por um canal oficial quando disponível.",
            "contact",
          );
        if (d.step === 2)
          return reviewPanel(d, "contact", "Revise sua mensagem", [
            ["Nome", d.data.name],
            ["E-mail", d.data.email],
            ["Assunto", subjectName(d.data.subject)],
            ["Mensagem", d.data.message],
          ]);
        return `${steps(["Sua mensagem", "Revisão", "Confirmação"], 1)}<h2>Como podemos nos conectar?</h2><div class="form-disclosure"><span aria-hidden="true">i</span><div><strong>Mensagem preparada neste navegador</strong>Este formulário ainda não envia mensagens. Não informe dados reais; ao final, você pode copiar o rascunho.</div></div><p class="small muted">Campos obrigatórios estão identificados.</p><form id="contact-form" novalidate>${field("name", "Seu nome", { value: d.data.name, autocomplete: "name", max: 100 })}${field("email", "Seu e-mail", { type: "email", value: d.data.email, max: 160 })}${field(
          "subject",
          "Assunto",
          {
            value: d.data.subject,
            options: [
              ["", "Selecione um assunto"],
              ["instituto", "Sobre o Instituto"],
              ["parcerias", "Parcerias"],
              ["voluntariado", "Voluntariado"],
              ["doacoes", "Doações"],
              ["atividades", "Atividades"],
              ["outro", "Outro assunto"],
            ],
          },
        )}${field("message", "Mensagem", { value: d.data.message, area: true, help: "Não inclua informações de saúde, documentos ou dados bancários." })}${consent(d.data.consent)}<div class="form-actions"><span class="small muted">Etapa 1 de 3</span><button type="submit" class="btn primary">Revisar mensagem <span aria-hidden="true">→</span></button></div></form>`;
      }
      function subjectName(s) {
        return (
          {
            instituto: "Sobre o Instituto",
            parcerias: "Parcerias",
            voluntariado: "Voluntariado",
            doacoes: "Doações",
            atividades: "Atividades",
            outro: "Outro assunto",
          }[s] || s
        );
      }
      function reviewPanel(d, kind, title, rows) {
        return `${steps([kind === "contact" ? "Sua mensagem" : "Seu contato", "Revisão", "Confirmação"], 2)}<h2 tabindex="-1" data-flow-heading>${title}</h2><p class="muted small">Confira os dados. Você pode voltar para editar.</p><dl class="review">${rows
          .filter((r) => r[1])
          .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`)
          .join(
            "",
          )}</dl><div class="note">Este site ainda não encaminha mensagens. Ao finalizar, você poderá copiar o rascunho para enviá-lo por um canal oficial.</div><div class="form-actions"><button class="btn secondary" data-flow="back">Editar</button><button class="btn primary" data-flow="finish">Finalizar revisão <span aria-hidden="true">✓</span></button></div>`;
      }
      function donePanel(title, text, kind) {
        const reviewLabels =
          kind === "contact"
            ? ["Sua mensagem", "Revisão", "Finalização"]
            : ["Sua proposta", "Revisão", "Finalização"];
        return `${steps(reviewLabels, 3)}<div class="success">${icon("check")}<h2 tabindex="-1" data-flow-heading>${title}</h2><p>${text}</p><div class="form-disclosure" role="status"><span aria-hidden="true">i</span><div><strong>Conteúdo não enviado</strong>Este site não está conectado a um canal de atendimento. Copie o rascunho para encaminhá-lo depois por um canal oficial. Os dados temporários serão apagados ao sair.</div></div><div class="btn-row"><button class="btn primary" data-action="copy-draft">Copiar rascunho <span aria-hidden="true">⎘</span></button><a class="btn secondary" href="#/home">Voltar para Home</a><button class="btn secondary" data-flow="restart">Começar de novo</button></div></div>`;
      }
      function participate(slug) {
        const w = helpWays.find(
          (x) => x.slug === slug && ["empresa", "voluntario"].includes(x.kind),
        );
        if (!w) return notFound();
        let d = formDrafts[slug] || (formDrafts[slug] = { step: 1, data: {} });
        if (d.step === 3) {
          d.step = 1;
          d.data = {};
        }
        activeForm = { type: "participate", slug, w, draft: d };
        return (
          head(
            w.kind === "voluntario"
              ? "Compartilhe seu<br>tempo e <em>talento.</em>"
              : "Vamos construir<br>uma <em>parceria?</em>",
            w.what,
            w.title,
            [
              ["Como ajudar", "/ajudar"],
              [w.title, "/ajudar/" + slug],
              ["Apresentar interesse"],
            ],
          ) +
          section(
            `<div class="form-layout"><div class="form-shell" id="flow-panel">${participatePanel(d, w)}</div><aside><h2>Do interesse<br>à <em>conversa.</em></h2><ol class="step-list"><li><div><strong>Você se apresenta</strong>Conte sua ideia e deixe um contato.</div></li><li><div><strong>O Instituto avalia</strong>A proposta será avaliada após o recebimento por um canal oficial.</div></li><li><div><strong>Os próximos passos são combinados</strong>Condições e disponibilidade precisam ser acordadas.</div></li></ol><div class="note">Este formulário organiza a proposta para revisão; o envio depende de um canal oficial do Instituto.</div>${link("Rever esta modalidade", "/ajudar/" + slug, "plain")}</aside></div>`,
            "white",
          )
        );
      }
      function participatePanel(d, w) {
        if (d.step === 3)
          return donePanel(
            "Proposta revisada",
            "Seu rascunho sobre " +
              w.title.toLowerCase() +
              " está pronto para ser copiado e enviado por um canal oficial quando disponível.",
            "participate",
          );
        if (d.step === 2)
          return reviewPanel(d, "participate", "Confira sua proposta", [
            ["Modalidade", w.title],
            ["Nome", d.data.name],
            ["Organização", d.data.organization],
            ["E-mail", d.data.email],
            ["Telefone", d.data.phone],
            ["Disponibilidade", d.data.availability],
            ["Proposta", d.data.proposal],
          ]);
        return `${steps(["Seu contato", "Revisão", "Confirmação"], 1)}<h2>Conte um pouco sobre você</h2><div class="form-disclosure"><span aria-hidden="true">i</span><div><strong>Proposta preparada neste navegador</strong>O formulário não encaminha sua proposta ao Instituto. Não informe dados reais; você poderá copiar o rascunho ao final.</div></div><p class="small muted">Campos obrigatórios estão identificados.</p><form id="participate-form" novalidate>${field("name", "Seu nome", { value: d.data.name, autocomplete: "name", max: 100 })}${w.kind === "empresa" ? field("organization", "Nome da empresa", { value: d.data.organization, autocomplete: "organization", max: 120 }) : ""}${field("email", "Seu e-mail", { value: d.data.email, type: "email", max: 160 })}${field("phone", "Telefone", { value: d.data.phone, type: "tel", required: false, autocomplete: "tel", max: 30, help: "Opcional. Inclua o DDD; use de 10 a 15 dígitos." })}${
          w.kind === "voluntario"
            ? field("availability", "Disponibilidade", {
                value: d.data.availability,
                options: [
                  ["", "Selecione uma opção"],
                  ["Durante a semana", "Durante a semana"],
                  ["Finais de semana", "Finais de semana"],
                  ["Flexível / a combinar", "Flexível / a combinar"],
                ],
              })
            : ""
        }${field("proposal", w.field, { value: d.data.proposal, area: true, placeholder: w.placeholder, help: "Descreva sua ideia sem anexar documentos ou dados sensíveis." })}${consent(d.data.consent)}<div class="form-actions"><a class="btn secondary" href="#/ajudar/${w.slug}">Voltar</a><button type="submit" class="btn primary">Revisar interesse <span aria-hidden="true">→</span></button></div></form>`;
      }
      function parsedAmount(value) {
        return Number(String(value).replace(",", "."));
      }
      function validAmount(value) {
        return (
          /^\d{1,7}([.,]\d{1,2})?$/.test(value) &&
          Number.isFinite(parsedAmount(value)) &&
          parsedAmount(value) >= 1 &&
          parsedAmount(value) <= 1000000
        );
      }
      function amount() {
        return donation.amount === "outro"
          ? parsedAmount(donation.custom)
          : Number(donation.amount);
      }
      const currency = (n) =>
        Number(n).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      function donate() {
        if (donation.step === 3) donation.step = 1;
        activeForm = { type: "donate" };
        return (
          head(
            "Doe uma vez.<br>Ou faça do amor um <em>hábito.</em>",
            "Apoiar com recursos financeiros é uma das formas de participar. Conheça as opções e revise sua escolha antes de seguir.",
            "Como doar",
            [["Como doar"]],
          ) +
          section(
            `<div class="form-layout"><div class="form-shell" id="flow-panel">${donatePanel()}</div><aside><div class="eyebrow">Cada contribuição importa</div><h2>Um gesto hoje.<br>Uma possibilidade<br>de <em>continuidade.</em></h2><p class="muted">Contribuições recorrentes podem ajudar no planejamento. Doações pontuais permitem participar no momento que faz sentido para você.</p><div class="note">Valores exibidos são sugestões de interface. Não representam custos, metas ou benefícios específicos do Instituto.</div><h3>Clareza em cada passo</h3><ul class="line-list"><li><p><strong>Você escolhe</strong>Valor e frequência ficam visíveis antes da conclusão.</p></li><li><p><strong>Você revisa</strong>Volte e altere sua escolha antes de confirmar.</p></li><li><p><strong>Você acompanha</strong>A versão institucional deverá apresentar destinação e prestação de contas.</p></li></ul></aside></div>`,
            "white",
          ) +
          section(
            `<h2>Antes de contribuir</h2>${faq([
              [
                "Como o recurso será utilizado?",
                "<p>A destinação dos recursos e os documentos de prestação de contas deverão ser fornecidos e aprovados pelo Instituto antes de habilitar doações reais.</p>",
              ],
              [
                "Posso doar por Pix ou cartão?",
                "<p>Os meios de pagamento oficiais ainda precisam ser confirmados. Nenhuma chave Pix, QR Code ou campo de cartão está disponível nesta página.</p>",
              ],
              [
                "A doação mensal pode ser cancelada?",
                "<p>A política de recorrência e cancelamento deverá ser definida e exibida antes de qualquer contratação real. Aqui, nenhuma recorrência é ativada.</p>",
              ],
              [
                "Vou receber um comprovante?",
                "<p>A confirmação exibida nesta página não representa pagamento nem é um recibo ou comprovante financeiro.</p>",
              ],
            ])}`,
          )
        );
      }
      function donatePanel() {
        if (donation.step === 3)
          return `${steps(["Sua doação", "Revisão", "Finalização"], 3)}<div class="success">${icon("check")}<h2 tabindex="-1" data-flow-heading>Escolha revisada.<br>Um próximo passo claro.</h2><p>Você selecionou uma contribuição de <strong>${currency(amount())}</strong>${donation.frequency === "mensal" ? " por mês" : " em uma única vez"}.</p><div class="notice"><strong>Nenhum valor foi cobrado.</strong><br>Não há assinatura ativa nem comprovante de doação.</div><div class="btn-row"><a class="btn primary" href="#/ajudar">Outras formas de ajudar</a><button class="btn secondary" data-flow="restart">Escolher novamente</button></div></div>`;
        if (donation.step === 2)
          return `${steps(["Sua doação", "Revisão", "Finalização"], 2)}<h2 tabindex="-1" data-flow-heading>Confira sua escolha</h2><p class="muted">Esta é a opção que você selecionou. O site ainda não processa pagamentos.</p><dl class="review"><div><dt>Valor</dt><dd>${currency(amount())}</dd></div><div><dt>Frequência</dt><dd>${donation.frequency === "mensal" ? "Mensal" : "Uma única vez"}</dd></div><div><dt>Destino</dt><dd>Instituto Doses de Amor</dd></div><div><dt>Pagamento</dt><dd>Indisponível</dd></div></dl><form id="donate-confirm" novalidate><div class="field"><label class="check-label" for="donation-consent"><input type="checkbox" id="donation-consent" required><span>Entendi que não haverá cobrança nem ativação de doação recorrente.</span></label><small class="error-text" id="donation-consent-error" hidden></small></div><div class="form-actions"><button type="button" class="btn secondary" data-flow="back">Editar</button><button type="submit" class="btn primary">Finalizar revisão <span aria-hidden="true">✓</span></button></div></form>`;
        return `${steps(["Sua doação", "Revisão", "Finalização"], 1)}<h2>Como você quer contribuir?</h2><p class="small muted">Pagamento indisponível. Nenhuma cobrança será feita.</p><form id="donate-form" novalidate><fieldset><legend>1. Escolha a frequência</legend><div class="choice-row">${[
          ["unica", "Uma única vez"],
          ["mensal", "Todo mês"],
        ]
          .map(
            ([v, t]) =>
              `<label class="radio-option"><input type="radio" name="frequency" value="${v}" ${donation.frequency === v ? "checked" : ""}><span>${t}</span></label>`,
          )
          .join(
            "",
          )}</div></fieldset><fieldset><legend>2. Escolha um valor sugerido</legend><div class="choice-row">${[
          ["30", "R$ 30"],
          ["60", "R$ 60"],
          ["100", "R$ 100"],
          ["outro", "Outro valor"],
        ]
          .map(
            ([v, t]) =>
              `<label class="radio-option"><input type="radio" name="amount" value="${v}" ${donation.amount === v ? "checked" : ""}><span>${t}</span></label>`,
          )
          .join(
            "",
          )}</div></fieldset><div id="custom-wrap" ${donation.amount === "outro" ? "" : "hidden"}>${field("custom-amount", "Valor em reais", { value: donation.custom, required: donation.amount === "outro", help: "De R$ 1,00 a R$ 1.000.000,00. Exemplo: 45,50.", max: 10 })}</div><div class="notice"><span class="label">Pagamento indisponível</span>Não há cobrança, cadastro financeiro ou assinatura ativa.</div><div class="form-actions"><span class="small muted">Etapa 1 de 3</span><button type="submit" class="btn primary">Revisar doação <span aria-hidden="true">→</span></button></div></form>`;
      }
      function renderFlow() {
        const p = $("#flow-panel");
        if (!p) return;
        if (activeForm.type === "donate") p.innerHTML = donatePanel();
        else if (activeForm.type === "contact")
          p.innerHTML = contactPanel(activeForm.draft);
        else p.innerHTML = participatePanel(activeForm.draft, activeForm.w);
        $("[data-flow-heading]", p)?.focus();
        p.scrollIntoView({ block: "start", behavior: "instant" });
      }
      function sitemap() {
        return (
          head(
            "Um mapa para<br>encontrar seu <em>caminho.</em>",
            "Todos os caminhos deste protótipo, reunidos em um único lugar.",
            "Mapa do site",
            [["Mapa do site"]],
          ) +
          section(
            `<ul class="sitemap"><li><a href="#/home">Home</a></li><li><a href="#/sobre">Sobre nós</a><ul><li><a href="#/sobre/time">Time</a></li><li><a href="#/sobre/noticias">Notícias</a></li></ul></li><li><a href="#/cancer">Câncer de mama</a><ul><li><a href="#/cancer/o-que-e">O que é</a></li><li><a href="#/cancer/mamografia">Mamografia</a></li><li><a href="#/cancer/direitos">Direitos do paciente</a></li></ul></li><li><a href="#/doar">Como doar</a><ul><li>Valor e frequência → Revisão → Confirmação simulada</li></ul></li><li><a href="#/parcerias">Nossos parceiros</a><ul><li>Parcerias atuais e anteriores</li><li>Apresentar proposta de parceria</li></ul></li><li><a href="#/ajudar">Como ajudar</a><ul>${helpWays.map((w) => `<li><a href="#/ajudar/${w.slug}">${w.title}</a></li>`).join("")}</ul></li><li><a href="#/atividades">Nossas atividades</a><ul><li>Filtros por categoria</li><li>Proposta de atividade → Contato de interesse</li></ul></li><li><a href="#/contato">Contato</a><ul><li>Mensagem → Revisão → Confirmação simulada</li></ul></li><li><a href="#/privacidade">Privacidade</a><a href="#/projeto">Guia do protótipo</a></li></ul>`,
            "white",
          )
        );
      }
      function privacy() {
        return (
          head(
            "Clareza também<br>faz parte do <em>cuidado.</em>",
            "Aviso de funcionamento deste protótipo. A política institucional definitiva deverá ser validada antes do lançamento.",
            "Privacidade",
            [["Privacidade"]],
          ) +
          section(
            `<article class="narrow"><h2>Formulários e pagamentos</h2><p>Os formulários funcionam somente nesta página. Eles não enviam mensagens, não cadastram interessados e não realizam cobranças.</p><p>Os campos ficam temporariamente na memória da página para permitir revisão e cópia do rascunho. Recarregar ou fechar a página apaga os rascunhos; iniciar outro preenchimento também limpa o anterior.</p><h2>Use dados de exemplo</h2><p>Não informe documentos, dados bancários, laudos ou informações de saúde. Não há envio de anexos, ferramentas de análise de comportamento ou armazenamento em cookies configurados por este site.</p><h2>Sobre os links externos</h2><p>As fontes educativas apontam para páginas oficiais do INCA. Ao visitá-las, passam a valer as condições e políticas desses sites.</p><h2>Antes de colocar o site em operação</h2><p>O Instituto deverá definir o responsável pelo tratamento de dados, as finalidades, a base legal, os destinatários, o período de retenção e o canal para exercício dos direitos. Também será necessário revisar os serviços de hospedagem e pagamento que forem utilizados.</p><div class="note">Este aviso informativo não substitui uma política de privacidade aprovada pelo Instituto.</div>${link("Voltar para Home", "/home", "secondary")}</article>`,
            "white",
          )
        );
      }
      const uxRows = [
        [
          "Hick",
          "Três entradas por intenção na Home; seis formas de ajudar aparecem apenas na área correspondente; uma ação principal por etapa.",
        ],
        [
          "Fitts",
          "Botões principais com 48 px de altura; controles e links de navegação com pelo menos 44 px; ações próximas aos campos e espaçamento entre alvos.",
        ],
        [
          "Miller",
          "Conteúdo agrupado por assunto, cartões com título e descrição curta, formulários divididos em três etapas e resumo para conferência.",
        ],
        [
          "Nielsen 1 · Status",
          "Passos identificados, filtros com contagem e confirmação explícita de simulação.",
        ],
        [
          "Nielsen 2 · Linguagem",
          "Rótulos em português simples e informações adequadas ao contexto do visitante.",
        ],
        [
          "Nielsen 3 · Controle",
          "Voltar e editar antes de concluir; navegação do navegador; menus fecham com Escape.",
        ],
        [
          "Nielsen 4 · Consistência",
          "Cabeçalho, rodapé, botões, cartões e padrões de formulário reutilizados em todas as páginas.",
        ],
        [
          "Nielsen 5 · Prevenção",
          "Sem dados bancários ou de saúde; validação antes da revisão; confirmação antes do fim da doação.",
        ],
        [
          "Nielsen 6 · Reconhecimento",
          "Navegação atual, breadcrumbs, resumo dos dados e caminhos visíveis.",
        ],
        [
          "Nielsen 7 · Eficiência",
          "Entradas por intenção, acesso direto às modalidades, teclado e filtros de atividades.",
        ],
        [
          "Nielsen 8 · Simplicidade",
          "Hierarquia tipográfica clara, textos curtos, espaços de respiro e informações adicionais em acordeões.",
        ],
        [
          "Nielsen 9 · Recuperação",
          "Erros específicos junto aos campos e resumo com links para corrigir; dados conservados ao editar.",
        ],
        [
          "Nielsen 10 · Ajuda",
          "FAQ contextual, fontes oficiais, mapa do site e aviso de funcionamento acessíveis pelo rodapé.",
        ],
      ];
      function table(headers, rows) {
        return `<div class="table-scroll" tabindex="0" role="region" aria-label="Tabela: ${headers[0]}"><table><thead><tr>${headers.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`;
      }
      function project() {
        return (
          head(
            "Do conceito à<br><em>experiência.</em>",
            "Guia de navegação, identidade, componentes e decisões do protótipo do Instituto Doses de Amor.",
            "Visão do projeto",
            [["Guia do protótipo"]],
            `<nav class="project-nav" aria-label="Nesta página"><a href="#identidade" data-scroll="identidade">Identidade</a><a href="#telas" data-scroll="telas">Telas responsivas</a><a href="#componentes" data-scroll="componentes">Componentes</a><a href="#ux" data-scroll="ux">Decisões de UX</a><a href="#acessibilidade" data-scroll="acessibilidade">Acessibilidade</a>${link("Abrir sitemap", "/mapa", "plain")}</nav>`,
          ) +
          section(
            `<div class="grid g3"><article class="card"><h2 style="font-size:1.4rem">Explore</h2><p>Use o menu e os links entre as páginas. Home, Sobre, Câncer de Mama, Como Doar, Como Ajudar, Atividades e Contato estão conectados.</p></article><article class="card"><h2 style="font-size:1.4rem">Experimente</h2><p>Simule uma doação, uma proposta de parceria, um cadastro de interesse voluntário ou uma mensagem. Você pode voltar e corrigir antes de concluir.</p></article><article class="card"><h2 style="font-size:1.4rem">Valide</h2><p>História, missão, time, notícias, agenda, contatos, pagamentos e serviços reais precisam de conteúdo aprovado do Instituto.</p></article></div>`,
            "white",
          ) +
          section(
            `<div id="identidade"><div class="eyebrow">Identidade visual</div><h2>Uma marca preservada.<br>Uma interface <em>acolhedora.</em></h2><p class="narrow muted">A assinatura e o símbolo foram extraídos da imagem de referência, sem redesenhar ou recolorir. O vermelho original da marca foi mantido. O arquivo vetorial será necessário para a aplicação definitiva em alta resolução.</p><figure class="identity-story"><div class="identity-brand-art" role="img" aria-label="Composição com a marca Doses de Amor"><img src="./assets/images/doses-logo.png" width="264" height="148" alt="Doses de Amor" loading="lazy" decoding="async"></div><figcaption><span class="photo-kicker">Identidade vivida</span><strong>A marca ganha sentido quando aparece nas pessoas.</strong><p class="muted">A composição preserva a assinatura original e cria uma área visual estável, pronta para receber fotografias oficiais quando estiverem disponíveis.</p></figcaption></figure><div class="grid g2"><div class="card"><img src="./assets/images/doses-logo.png" alt="Assinatura original Doses de Amor" width="264" height="148"><p class="small muted" style="margin-top:20px">Assinatura original preservada</p></div><div class="card"><h3>Hierarquia tipográfica</h3><p style="font-size:1.65rem;font-weight:700;line-height:1.2">Títulos fortes e diretos.</p><p>Texto sem serifa para leitura confortável.</p><p style="font-family:Georgia,serif;font-size:1.8rem;font-style:italic;color:var(--rose)">Uma palavra de destaque.</p><p class="small muted">A referência não identifica os nomes das fontes. Usamos Arial e Georgia como aproximações locais, sem alegar a fonte oficial.</p></div></div><div class="token-grid" style="margin-top:30px">${["CF3268", "C84D70", "BB678D", "F688BB", "F6D4E5", "FAF8EF"].map((c) => `<div><div class="swatch" style="background:#${c}"></div><code>#${c}</code></div>`).join("")}</div><p class="small muted" style="margin-top:20px">Neutros de apoio: #38252E para texto e #78233F para títulos menores e links. Os rosas claros são usados em fundos e elementos decorativos.</p><details class="accordion"><summary>Ver os três arquivos originais de referência</summary><div><div class="grid"><img src="./assets/images/brand-signature.webp" alt="Referência original: logotipo, símbolo e logomarca"><img src="./assets/images/typography-reference.webp" alt="Referência original de tipografia: títulos sem serifa em negrito, texto sem serifa e destaques com serifa"><img src="./assets/images/palette-reference.webp" alt="Referência original com as seis cores da identidade"></div></div></details></div>`,
          ) +
          section(
            `<div id="telas"><div class="eyebrow">Desktop · tablet · mobile</div><h2>O mesmo caminho,<br>em qualquer <em>tela.</em></h2><p class="narrow muted">O protótipo responde à largura real do navegador. Abra em um computador, tablet ou celular; os blocos, o menu e os formulários se reorganizam sem trocar de versão.</p><div class="device-grid">${["desktop", "tablet", "mobile"].map((d, i) => `<div><div class="device ${d}"><div class="device-screen"><div class="mock-nav"></div><div class="mock-layout"><div class="mock-title"></div><div class="mock-art"></div></div><div class="mock-cards"><span></span><span></span><span></span></div></div></div><div class="device-label">${["Desktop · 1440 px", "Tablet · 768 px", "Mobile · 390 px"][i]}</div></div>`).join("")}</div>${table(
              ["Comportamento", "Adaptação"],
              [
                [
                  "Desktop · a partir de 1100 px",
                  "Menu completo; hero em duas colunas; cartões em três colunas; formulário com orientação lateral.",
                ],
                [
                  "Tablet · 701–1099 px",
                  "Menu recolhido até 940 px; cartões em duas colunas; redução progressiva de espaçamento.",
                ],
                [
                  "Mobile · até 700 px",
                  "Menu vertical; uma coluna; ações e rótulos legíveis; campos com largura total; ilustração após o texto.",
                ],
              ],
            )}<p class="small muted" style="margin-top:18px">As miniaturas acima são diagramas de composição. A experiência real é a página responsiva.</p></div>`,
            "white",
          ) +
          section(
            `<div id="componentes"><div class="eyebrow">Biblioteca de componentes</div><h2>Peças simples.<br>Uma experiência <em>consistente.</em></h2><div class="grid g2"><div class="card"><h3>Botões e rótulos</h3><div class="btn-row">${link("Ação principal", "/doar")}${link("Ação secundária", "/ajudar", "secondary")}</div><div>${tag("Conteúdo em validação")}</div></div><div class="card"><h3>Navegação e contexto</h3><p>Menu com subníveis, breadcrumbs, abas por seção e rodapé com sitemap. A página ativa é indicada visualmente e para tecnologias assistivas.</p></div><div class="card"><h3>Formulários e estados</h3><p>Rótulos permanentes, ajuda textual, erro junto ao campo, resumo de erros, revisão, edição e confirmação. Rascunhos em memória, sem envio.</p>${link("Experimentar formulário", "/contato", "plain")}</div><div class="card"><h3>Conteúdo progressivo</h3>${faq([["Exemplo de acordeão", "<p>Conteúdo adicional disponível por clique, toque ou teclado. O controle nativo informa quando está aberto.</p>"]])}<p class="small muted" style="margin-top:20px">Cartões, filtros, avisos, passos e mensagens de status seguem o mesmo padrão.</p></div></div></div>`,
          ) +
          section(
            `<div id="ux"><div class="eyebrow">Leis e heurísticas</div><h2>Decisões que ajudam<br>a seguir em <em>frente.</em></h2>${table(["Princípio", "Aplicação neste protótipo"], uxRows)}</div>`,
            "white",
          ) +
          section(
            `<div id="acessibilidade"><div class="eyebrow">WCAG 2.2 · objetivo AA</div><h2>Acesso pensado<br>desde o <em>início.</em></h2><div class="notice"><span class="label">Escopo da verificação</span>Os padrões abaixo foram implementados para apoiar o nível AA. Conformidade integral exige auditoria com tecnologias assistivas e validação do conteúdo definitivo.</div>${table(
              ["Critérios relacionados", "Implementação"],
              [
                [
                  "1.1.1 · Alternativas textuais",
                  "Marca com texto alternativo; ícones e ilustração decorativos ignorados por leitores de tela.",
                ],
                [
                  "1.3.1 / 1.3.2 · Estrutura",
                  "HTML semântico, hierarquia de títulos, landmarks, rótulos, fieldsets e ordem de leitura coerente.",
                ],
                [
                  "1.4.1 / 1.4.3 / 1.4.11 · Cor e contraste",
                  "Cor acompanhada de texto ou ícone; neutros escuros; branco sobre #CF3268 para botões; bordas visíveis.",
                ],
                [
                  "1.4.4 / 1.4.10 / 1.4.12 · Leitura",
                  "Layout fluido, texto redimensionável e áreas sem altura fixa para textos. Tabelas extensas têm rolagem local.",
                ],
                [
                  "2.1.1 / 2.1.2 · Teclado",
                  "Navegação e formulários operáveis por teclado; controles nativos; sem armadilhas de foco.",
                ],
                [
                  "2.4.1 / 2.4.3 / 2.4.7 / 2.4.11 · Foco",
                  "Pular para conteúdo, foco visível, foco no título após navegação e cabeçalho que não cobre as etapas.",
                ],
                [
                  "2.5.3 / 2.5.8 · Controles",
                  "Nomes acessíveis compatíveis com rótulos; alvos principais de 44–48 px; espaçamento dos links secundários.",
                ],
                [
                  "3.2.2 / 3.3.1 / 3.3.2 / 3.3.3 / 3.3.7 · Formulários",
                  "Ação explícita para avançar; instruções, campos obrigatórios, erros específicos e edição sem redigitar tudo.",
                ],
                [
                  "4.1.2 / 4.1.3 · Estados",
                  "Estados de menu e filtros expostos; mensagens de erro e confirmação; feedback de cópia em região de status.",
                ],
                [
                  "Movimento reduzido",
                  "Preferência do sistema respeitada; sem carrossel automático, animação essencial ou limite de tempo.",
                ],
              ],
            )}<p class="small muted" style="margin-top:22px">Referências de projeto: <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">WCAG 2.2 · W3C (nova aba)</a> e <a href="https://www.nngroup.com/articles/ten-usability-heuristics/" target="_blank" rel="noopener noreferrer">10 heurísticas de Nielsen · NN/g (nova aba)</a>.</p><div class="note">Pendências de publicação institucional: fontes e arquivos oficiais em alta resolução; revisão de saúde e direitos; dados e textos aprovados; política de privacidade; integrações de contato e pagamento; auditoria final de acessibilidade.</div></div>`,
          )
        );
      }
      function notFound() {
        return (
          head(
            "Esse caminho<br>ainda não <em>floresceu.</em>",
            "A página solicitada não foi encontrada. Você pode voltar ao início ou consultar o mapa do site.",
            "Página não encontrada",
            [["Página não encontrada"]],
          ) +
          section(
            `<div class="btn-row">${link("Voltar para Home", "/home")}${link("Abrir mapa do site", "/mapa", "secondary")}</div>`,
            "white",
          )
        );
      }
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      function announce(text, tone = "info") {
        if (!$("#toast")) return;
        toast(text, tone);
      }
      function setupReveal(root = main) {
        const items = $$(".reveal", root);
        if (!items.length) return;
        if (reduceMotion.matches || !("IntersectionObserver" in window)) {
          items.forEach((el) => el.classList.add("is-visible"));
          return;
        }
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -6%" },
        );
        items.forEach((el) => observer.observe(el));
      }
      function enhanceImages(root = document) {
        $$("img", root).forEach((img) => {
          if (!img.hasAttribute("decoding")) img.decoding = "async";
          if (!img.hasAttribute("loading") && !img.hasAttribute("data-priority"))
            img.loading = "lazy";
          if (img.complete && img.naturalWidth) img.classList.add("is-loaded");
          else img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
          img.addEventListener(
            "error",
            () => {
              img.classList.add("is-broken");
              img.closest(".partner-logo-slot,.identity-brand-art,.hero-brand-visual")?.classList.add("media-error");
            },
            { once: true },
          );
        });
      }
      function openPartnerDock() {
        const dock = $("#partner-dock");
        const trigger = $("#partner-action");
        if (!dock || !trigger || trigger.hidden) return;
        dock.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        requestAnimationFrame(() => dock.classList.add("is-open"));
        $("#partner-dock-close")?.focus({ preventScroll: true });
      }
      function closePartnerDock({ restoreFocus = false } = {}) {
        const dock = $("#partner-dock");
        const trigger = $("#partner-action");
        if (!dock || dock.hidden) return;
        dock.classList.remove("is-open");
        trigger?.setAttribute("aria-expanded", "false");
        const finish = () => {
          dock.hidden = true;
          dock.removeEventListener("transitionend", finish);
        };
        if (reduceMotion.matches) finish();
        else {
          dock.addEventListener("transitionend", finish, { once: true });
          setTimeout(finish, 240);
        }
        if (restoreFocus) trigger?.focus({ preventScroll: true });
      }
      function togglePartnerDock() {
        const dock = $("#partner-dock");
        if (!dock) return;
        dock.hidden ? openPartnerDock() : closePartnerDock({ restoreFocus: true });
      }
      function fieldMessage(el) {
        if (!el || el.disabled || el.type === "radio") return "";
        if (
          el.required &&
          ((el.type === "checkbox" && !el.checked) ||
            (el.type !== "checkbox" && !el.value.trim()))
        )
          return el.type === "checkbox"
            ? "Confirme a leitura para continuar."
            : "Preencha este campo.";
        if (
          el.type === "email" &&
          el.value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())
        )
          return "Informe um e-mail válido, como nome@exemplo.com.";
        if (el.type === "tel" && el.value.trim()) {
          const digits = el.value.replace(/\D/g, "");
          if (digits.length < 10 || digits.length > 15)
            return "Informe o DDD e um telefone com 10 a 15 dígitos.";
        }
        if (el.id === "custom-amount" && el.value && !validAmount(el.value))
          return "Informe um valor entre R$ 1,00 e R$ 1.000.000,00.";
        return "";
      }
      function setFieldFeedback(el, message, { quiet = false } = {}) {
        const form = el.closest("form");
        if (!form || !el.id) return;
        const field = el.closest(".field");
        const msg = $("#" + el.id + "-error", form);
        field?.classList.toggle("has-error", Boolean(message));
        field?.classList.toggle("is-valid", !message && Boolean(el.value?.trim?.()) && el.type !== "checkbox");
        if (message) {
          el.setAttribute("aria-invalid", "true");
          if (msg) {
            msg.hidden = false;
            msg.textContent = message;
            const hints = (el.getAttribute("aria-describedby") || "")
              .split(" ")
              .filter(Boolean)
              .filter((id) => !id.endsWith("-error"));
            el.setAttribute("aria-describedby", [...hints, msg.id].join(" "));
          }
          if (!quiet) field?.classList.add("feedback-pulse");
        } else if (el.hasAttribute("aria-invalid")) {
          el.removeAttribute("aria-invalid");
          if (msg) {
            msg.hidden = true;
            msg.textContent = "";
          }
          const hints = (el.getAttribute("aria-describedby") || "")
            .split(" ")
            .filter((id) => id && !id.endsWith("-error"));
          hints.length ? el.setAttribute("aria-describedby", hints.join(" ")) : el.removeAttribute("aria-describedby");
        }
        if (field?.classList.contains("feedback-pulse"))
          setTimeout(() => field.classList.remove("feedback-pulse"), 360);
      }
      let currentRoute = "";
      function render() {
        const raw = location.hash.slice(1) || "/home";
        const path = raw.split("?")[0].replace(/\/$/, "") || "/home";
        currentRoute = path;
        const partnerAction = $("#partner-action");
        if (partnerAction) {
          partnerAction.hidden =
            path === "/parcerias" ||
            path.startsWith("/participar/") ||
            path === "/contato" ||
            path === "/doar";
          if (partnerAction.hidden) closePartnerDock();
        }
        activeForm = null;
        let content;
        if (path === "/home") content = home();
        else if (path === "/sobre") content = about();
        else if (path === "/sobre/time") content = team();
        else if (path === "/sobre/time/perfil") content = profile();
        else if (path === "/sobre/noticias") content = news();
        else if (path === "/sobre/noticias/modelo") content = newsModel();
        else if (path === "/cancer") content = cancer();
        else if (
          path.startsWith("/cancer/") &&
          articleContent[path.split("/")[2]]
        )
          content = healthArticle(path.split("/")[2]);
        else if (path === "/ajudar") content = ways();
        else if (path.startsWith("/ajudar/"))
          content = helpDetail(path.split("/")[2]);
        else if (path === "/parcerias") content = partnershipsPage();
        else if (path.startsWith("/participar/"))
          content = participate(path.split("/")[2]);
        else if (path === "/doar") content = donate();
        else if (path === "/atividades") content = activitiesPage();
        else if (path.startsWith("/atividades/"))
          content = activityDetail(path.split("/")[2]);
        else if (path === "/contato") content = contact();
        else if (path === "/mapa") content = sitemap();
        else if (path === "/privacidade") content = privacy();
        else if (path === "/projeto") content = project();
        else content = notFound();
        main.classList.remove("page-enter");
        main.innerHTML = content;
        enhanceImages(main);
        setupReveal(main);
        requestAnimationFrame(() => main.classList.add("page-enter"));
        const heading = $("h1", main);
        document.title =
          (heading?.innerText.replace(/\s+/g, " ").trim() ||
            "Instituto Doses de Amor") + " · Doses de Amor";
        const group = path.split("/")[1];
        $$("[data-nav]").forEach((el) => {
          const active = el.dataset.nav === group;
          el.classList.toggle("active", active);
          if (active && el.tagName === "A")
            el.setAttribute("aria-current", "page");
          else el.removeAttribute("aria-current");
        });
        $$(".nav-pop a").forEach((el) => {
          if (el.getAttribute("href") === "#" + path)
            el.setAttribute("aria-current", "page");
          else el.removeAttribute("aria-current");
        });
        closeMenu();
        $$(".nav-group").forEach((el) => (el.open = false));
        window.scrollTo({ top: 0, behavior: "instant" });
        heading?.focus({ preventScroll: true });
      }
      function closeMenu() {
        $("#primary-nav").classList.remove("open");
        $("#menu-toggle").setAttribute("aria-expanded", "false");
      }
      $("#menu-toggle").addEventListener("click", () => {
        const open = $("#primary-nav").classList.toggle("open");
        $("#menu-toggle").setAttribute("aria-expanded", String(open));
        announce(open ? "Menu aberto." : "Menu fechado.");
      });
      $("#partner-action")?.addEventListener("click", togglePartnerDock);
      $("#partner-dock-close")?.addEventListener("click", () => closePartnerDock({ restoreFocus: true }));
      $$(".nav-group").forEach((el) =>
        el.addEventListener("toggle", () => {
          if (el.open)
            $$(".nav-group")
              .filter((x) => x !== el)
              .forEach((x) => (x.open = false));
        }),
      );
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          const partnerDock = $("#partner-dock");
          if (partnerDock && !partnerDock.hidden) {
            closePartnerDock({ restoreFocus: true });
            return;
          }
          const group = $(".nav-group[open]");
          if (group) {
            group.open = false;
            $("summary", group).focus();
          } else if ($("#primary-nav").classList.contains("open")) {
            closeMenu();
            $("#menu-toggle").focus();
          }
        }
      });
      document.addEventListener("click", (event) => {
        if (!event.target.closest("#partner-dock,#partner-action")) closePartnerDock();
        const partnerSite = event.target.closest("[data-partner-site]");
        if (partnerSite) announce(`Abrindo o site oficial de ${partnerSite.dataset.partnerSite} em nova aba.`);
        const tactile = event.target.closest(".btn,.filter,.path-item,.partner-dock-item,.partner-action");
        if (tactile) {
          tactile.classList.add("is-pressed");
          setTimeout(() => tactile.classList.remove("is-pressed"), 180);
        }
        if (!event.target.closest(".nav-group"))
          $$(".nav-group").forEach((x) => (x.open = false));
        if (event.target.closest("[data-skip]")) {
          event.preventDefault();
          main.focus();
          main.scrollIntoView();
        }
        const scroll = event.target.closest("[data-scroll]");
        if (scroll) {
          event.preventDefault();
          const target = $("#" + scroll.dataset.scroll);
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView();
        }
        const errorLink = event.target.closest("[data-error-target]");
        if (errorLink) {
          event.preventDefault();
          $("#" + errorLink.dataset.errorTarget)?.focus();
        }
        const filter = event.target.closest("[data-filter]");
        if (filter) {
          activityFilter = filter.dataset.filter;
          $$("[data-filter]").forEach((el) =>
            el.setAttribute("aria-pressed", String(el === filter)),
          );
          const list = activities.filter(
            (a) => activityFilter === "Todas" || a.category === activityFilter,
          );
          $("#activity-grid").innerHTML = activityCards(list);
          $("#filter-status").textContent =
            `${list.length} proposta${list.length !== 1 ? "s" : ""} de estrutura`;
        }
        const flow = event.target.closest("[data-flow]");
        if (flow) {
          if (flow.dataset.flow === "back") {
            if (activeForm.type === "donate") donation.step = 1;
            else activeForm.draft.step = 1;
            renderFlow();
          } else if (flow.dataset.flow === "finish") {
            activeForm.draft.step = 3;
            renderFlow();
          } else if (flow.dataset.flow === "restart") {
            if (activeForm.type === "donate") {
              Object.assign(donation, {
                step: 1,
                frequency: "unica",
                amount: "60",
                custom: "",
              });
            } else {
              activeForm.draft.step = 1;
              activeForm.draft.data = {};
            }
            renderFlow();
          }
        }
        const action = event.target.closest("[data-action]");
        if (action) {
          if (action.dataset.action === "copy-share") copyShare();
          if (action.dataset.action === "native-share") nativeShare();
          if (action.dataset.action === "copy-draft") copyDraft();
        }
      });
      document.addEventListener("change", (event) => {
        if (event.target.name === "amount") {
          donation.amount = event.target.value;
          const custom = donation.amount === "outro";
          $("#custom-wrap").hidden = !custom;
          $("#custom-amount").required = custom;
          $("#custom-amount").disabled = !custom;
          $("label[for='custom-amount'] .small").textContent = custom
            ? "(obrigatório)"
            : "(opcional)";
          if (custom) $("#custom-amount").focus();
        }
        if (event.target.name === "frequency")
          donation.frequency = event.target.value;
      });
      document.addEventListener("input", (event) => {
        if (event.target.id === "custom-amount")
          donation.custom = event.target.value;
        const el = event.target;
        if (el.matches("input,select,textarea") && el.hasAttribute("aria-invalid"))
          setFieldFeedback(el, fieldMessage(el), { quiet: true });
      });
      document.addEventListener("focusout", (event) => {
        const el = event.target;
        if (!el.matches("input,select,textarea") || !el.closest("form")) return;
        if (!el.required && !el.value.trim()) return;
        setFieldFeedback(el, fieldMessage(el));
      });
      document.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.id === "donate-form") {
          const custom = $("#custom-amount", form);
          custom.disabled = donation.amount !== "outro";
          if (!validate(form)) return;
          donation.step = 2;
          announce("Etapa concluída. Revise os dados antes de continuar.", "success");
          renderFlow();
        } else if (form.id === "donate-confirm") {
          if (!validate(form)) return;
          donation.step = 3;
          announce("Revisão concluída. Nenhum dado foi enviado automaticamente.", "success");
          renderFlow();
        } else if (
          form.id === "contact-form" ||
          form.id === "participate-form"
        ) {
          for (const input of $$('input:not([type="checkbox"]):not([type="radio"]), textarea', form))
            input.value = input.value.trim();
          activeForm.draft.data = readForm(form);
          if (!validate(form)) return;
          activeForm.draft.step = 2;
          announce("Campos validados. Agora revise seu rascunho.", "success");
          renderFlow();
        }
      });
      // Save unsent draft values only in the current JS page lifetime.
      document.addEventListener("input", (event) => {
        const form = event.target.closest("#contact-form,#participate-form");
        if (form && activeForm?.draft) activeForm.draft.data = readForm(form);
      });
      document.addEventListener("change", (event) => {
        const form = event.target.closest("#contact-form,#participate-form");
        if (form && activeForm?.draft) activeForm.draft.data = readForm(form);
      });
      let toastTimer;
      function toast(text, tone = "info") {
        const el = $("#toast");
        el.dataset.tone = tone;
        el.textContent = text;
        el.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => (el.hidden = true), 6000);
      }

      function draftText() {
        if (!activeForm?.draft?.data) return "";
        const data = activeForm.draft.data;
        const lines = [
          activeForm.type === "contact"
            ? "Mensagem para o Instituto Doses de Amor"
            : `Proposta: ${activeForm.w.title}`,
        ];
        const labels = {
          name: "Nome",
          organization: "Empresa",
          email: "E-mail",
          phone: "Telefone",
          availability: "Disponibilidade",
          subject: "Assunto",
          message: "Mensagem",
          proposal: "Proposta",
        };
        for (const [key, label] of Object.entries(labels)) {
          const value = data[key];
          if (value) lines.push(`${label}: ${key === "subject" ? subjectName(value) : value}`);
        }
        return lines.join("\n\n");
      }
      async function copyDraft() {
        try {
          const text = draftText();
          if (!text) throw new Error("Não há conteúdo para copiar.");
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
          } else {
            const input = document.createElement("textarea");
            input.value = text;
            input.setAttribute("aria-label", "Rascunho para copiar");
            input.style.cssText = "position:fixed;left:-9999px";
            document.body.append(input);
            input.select();
            const copied = document.execCommand("copy");
            input.remove();
            if (!copied) throw new Error("A cópia não foi autorizada pelo navegador.");
          }
          toast("Rascunho copiado. Nenhuma mensagem foi enviada.");
        } catch (error) {
          toast(`Não foi possível copiar: ${error.message}`);
        }
      }
      async function copyShare() {
        try {
          if (navigator.clipboard && window.isSecureContext)
            await navigator.clipboard.writeText(shareText);
          else {
            const input = document.createElement("textarea");
            input.value = shareText;
            input.setAttribute("aria-label", "Mensagem para copiar");
            input.style.cssText = "position:fixed;left:-9999px";
            document.body.append(input);
            input.select();
            const ok = document.execCommand("copy");
            input.remove();
            if (!ok) throw new Error("copy unavailable");
          }
          $("#share-status").textContent =
            "Mensagem copiada. Revise e compartilhe no canal de sua preferência.";
          toast("Mensagem copiada.");
        } catch {
          $("#share-status").textContent =
            "A cópia automática não está disponível. Selecione o texto da mensagem e copie manualmente.";
        }
      }
      async function nativeShare() {
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Instituto Doses de Amor",
              text: shareText,
            });
            $("#share-status").textContent =
              "Compartilhamento encaminhado ao recurso do seu dispositivo.";
          } catch (e) {
            $("#share-status").textContent =
              e.name === "AbortError"
                ? "Compartilhamento cancelado. Você pode tentar novamente."
                : "Não foi possível abrir o compartilhamento. Use “Copiar mensagem”.";
          }
        } else {
          await copyShare();
        }
      }
      window.addEventListener("hashchange", render);
      renderPartnerDock();
      enhanceImages(document);
      render();
