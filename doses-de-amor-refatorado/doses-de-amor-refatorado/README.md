# Instituto Doses de Amor — versão refatorada

## Estrutura
- `index.html`: HTML enxuto, sem CSS/JS/base64 gigantes embutidos.
- `assets/css/styles.css`: estilos originais + camada de movimento, feedback e parceiros.
- `assets/js/app.js`: roteamento, formulários, microinterações e dados dos parceiros.
- `assets/images/`: identidade original extraída do arquivo-base.
- `assets/images/partners/`: logos normalizadas e otimizadas em WebP.

## O que mudou
1. 7 imagens base64 foram externalizadas; as três cópias idênticas do logotipo agora usam um único arquivo.
2. Logos dos parceiros foram recortadas automaticamente pelo conteúdo visual e redimensionadas sem distorção.
3. As duas referências a uma foto local inexistente (`Identidade/Captura...png`) foram substituídas por componentes visuais construídos com a marca já fornecida, evitando imagem quebrada.
4. O menu fixo de parceiros virou uma vitrine acessível com links oficiais.
5. A página de parceiros ganhou painel inspirado na referência “Nossos números”, benefícios ESG e vantagem competitiva potencial por parceiro.
6. Formulários passam a dar feedback também durante a digitação/saída do campo, além do resumo de erros já existente.
7. Entradas de seção, hover, clique, abertura de menu e transições agora possuem microfeedback; `prefers-reduced-motion` é respeitado.
8. Imagens geradas por JS recebem `loading`, `decoding`, dimensões e tratamento de erro de forma centralizada.

## Parceiros e sites oficiais usados
- Instituto Quimioterapia & Beleza — https://quimioterapiaebeleza.org.br/
- Cabelegria — https://www.cabelegria.org/
- Banco de Lenços Flávia Flores — https://www.quimioterapiaebeleza.org.br/Banco-de-Len%C3%A7os.html
- Instituto ABIHPEC / De Bem com Você — https://institutoabihpec.org.br/debemcomvc/
- Hora Luterana / Hora Produções — https://www.horaluterana.org.br/a-hora-producoes
- Sociedade Bíblica do Brasil — https://www.sbb.org.br/
- Antilhas — https://antilhas.com.br/

## Observação de marca
O arquivo enviado como “Hora Produções.png” foi usado para o item “Hora Luterana · Hora Produções”, porque é a identidade visual efetivamente fornecida. O Banco de Lenços não recebeu um arquivo de logo separado; por isso, o site usa um tratamento tipográfico neutro em vez de inventar ou reaproveitar indevidamente outra marca.

- A Home ganhou um bloco visual de “números” inspirado na referência enviada, usando somente marcos já existentes no protótipo e a quantidade de parceiros informada, sem inventar indicadores de atendimento.
