# AGENTS.md

Diretrizes comportamentais para reduzir erros comuns de codificação em mestrados em Direito. Combine com instruções específicas do projeto, conforme necessário.

Equilíbrio: Estas diretrizes priorizam a cautela em detrimento da velocidade. Para tarefas triviais, use o bom senso.

1. Pense antes de programar
   Não faça suposições. Não esconda a confusão. Deixe as vantagens e desvantagens à mostra.

Antes da implementação:

Exponha suas suposições explicitamente. Em caso de dúvida, pergunte.
Se existirem múltiplas interpretações, apresente-as – não escolha em silêncio.
Se existir uma abordagem mais simples, diga-a. Questione-a quando necessário.
Se algo não estiver claro, pare. Nomeie o que está causando confusão. Pergunte. 2. Simplicidade em primeiro lugar
Código mínimo que resolva o problema. Nada de especulações.

Nenhuma funcionalidade além das solicitadas.
Sem abstrações para código de uso único.
Nenhuma "flexibilidade" ou "configurabilidade" que não tenha sido solicitada.
Não há tratamento de erros para cenários impossíveis.
Se você escrever 200 linhas e elas poderiam ser reduzidas a 50, reescreva.
Pergunte a si mesmo: "Um engenheiro sênior diria que isso é muito complicado?" Se sim, simplifique.

3. Alterações cirúrgicas
   Toque apenas no que for necessário. Limpe apenas a sua própria sujeira.

Ao editar um código existente:

Não tente "melhorar" o código, os comentários ou a formatação adjacentes.
Não refatore o que não está quebrado.
Adapte-se ao estilo existente, mesmo que você o fizesse de forma diferente.
Se você notar código morto não relacionado, mencione-o - não o apague.
Quando suas alterações criam arquivos órfãos:

Remova as importações/variáveis/funções que SUAS alterações tornaram não utilizadas.
Não remova código morto preexistente, a menos que seja solicitado.
O teste: Cada linha alterada deve estar diretamente relacionada à solicitação do usuário.

4. Execução orientada a objetivos
   Defina os critérios de sucesso. Repita o processo até que sejam verificados.

Transformar tarefas em objetivos verificáveis:

"Adicionar validação" → "Escrever testes para entradas inválidas e, em seguida, fazê-los passar"
"Corrigir o bug" → "Escreva um teste que o reproduza e, em seguida, faça com que ele seja aprovado"
"Refatorar X" → "Garantir que os testes passem antes e depois"
Para tarefas com várias etapas, apresente um plano resumido:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
   Critérios de sucesso robustos permitem que você crie ciclos independentes. Critérios fracos ("faça funcionar") exigem esclarecimentos constantes.

## Commands

```bash
# Development
npm run dev          # Start dev server on port 3000

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Testing
npm run test         # Run all tests with Vitest

# Linting & Formatting (Biome)
npm run lint         # Lint only
npm run format       # Format only
npm run check        # Lint + format together

# Database (Prisma + PostgreSQL)
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes (no migration file)
npm run db:migrate   # Create and apply migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed the database
```

All database commands load env from `.env.local` via `dotenv-cli`. `DATABASE_URL` must be set there.

## Architecture

This is a **TanStack Start** (React SSR framework) app with file-based routing, TanStack Query for data fetching, and Prisma for database access.

### Routing

Routes live in `src/routes/` using TanStack Router's file-based convention:

- `src/routes/__root.tsx` — root layout shell (HTML, head, body, devtools)
- `src/routes/index.tsx` — home page (`/`)
- `src/router.tsx` — router factory with QueryClient context wired in

The route tree is **auto-generated** into `src/routeTree.gen.ts` — never edit this file manually. Adding a file to `src/routes/` is enough to create a new route.

The router context carries a `QueryClient` instance, enabling SSR-aware query hydration via `@tanstack/react-router-ssr-query`.

### Data Layer

- **Server functions**: Use `createServerFn` from `@tanstack/react-start` for server-side logic called from components.
- **TanStack Query**: Provider and context are in `src/integrations/tanstack-query/`. Use `useQuery`/`useMutation` on the client.
- **Prisma**: Client singleton exported from `src/db.ts`. Uses `@prisma/adapter-pg` (PostgreSQL). Generated client is at `src/generated/prisma/`. Schema is at `prisma/schema.prisma`, seed script at `prisma/seed.ts`.

### Styling

Tailwind CSS v4 configured via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — configuration is CSS-first in `src/styles.css`). Biome handles formatting (tabs, double quotes).

### Path Aliases

Both `#/*` and `@/*` resolve to `src/*` (configured in `tsconfig.json` and `package.json#imports`).

### Theme

A flash-of-unstyled-content (FOUC) prevention script in `__root.tsx` reads `localStorage('theme')` and applies `light`/`dark` class to `<html>` before React hydrates. The `ThemeToggle` component (`src/components/ThemeToggle.tsx`) manages this.

### Dev Tools

TanStack Devtools (Router + Query) are mounted in the root shell and only active in development.
