# Fellowship em Uro-oncologia e Cirurgia Robótica · HAM 2027

Landing page oficial do processo seletivo 2027 (`fellowham.com.br`) do Fellowship em Uro-oncologia e Cirurgia Robótica do Hospital Aristides Maltez (Salvador, BA).

## Stack (pronta para migração no Lovable)

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 + `src/styles/tokens.css` (identidade visual v2: azul marinho, azul claro `#469ABB`, cinza, névoa luminosa, ruído granulado e fonte variável Archivo)
- `motion` (springs criticamente amortecidos, respeito a `prefers-reduced-motion` e gestos de sheet)
- Zero coleta de dados: sem formulário, sem cookies e sem banner de cookies

## Edição de conteúdo sem tocar em componentes

Todo o texto da página é lido de `src/data/landing-content.json`. O texto integral do edital de 07/11/2026 vive em `src/data/edital-content.json` e o arquivo oficial para download em `public/edital/Edital_Fellowship_Uro_Oncologia_HAM_2027.doc`.

### Chaves de configuração rápida em `src/data/landing-content.json`

- `config.enrollUrl`: link da ficha de inscrição no site do hospital (`https://www.lbcc.org.br`).
- `config.showVideo` e `config.videoUrl`: quando `true` e preenchido, ativa o bloco 02 e o botão "Assistir ao vídeo" no hero.
- `config.showMedCall`: exibe ou oculta o logotipo da MedCall na faixa de patrocínio.
- `config.showCoordination`: exibe ou oculta o bloco "Quem coordena".
- `config.showLegalFooter`: exibe ou oculta a linha de CRM-BA / RQE no rodapé.
- `config.analytics.eventName` e `beaconEndpoint`: dispara o evento sem cookie `inscricao_click` (compatível com Plausible, Umami, `sendBeacon` e `CustomEvent`).

## Desenvolvimento local

```bash
npm install
npm run dev
npm run build
```
