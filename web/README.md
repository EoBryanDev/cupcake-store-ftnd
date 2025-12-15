
# Cupcake Store - Frontend (PT-BR)

Este é o projeto de frontend da Cupcake Store, uma aplicação de e-commerce para uma loja de cupcakes.

## Começando

Siga estas instruções para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- Node.js (versão 20.x ou superior)
- pnpm (gerenciador de pacotes)

### Instalação

1.  Clone o repositório.
2.  Navegue até a pasta `web`.
3.  Crie um arquivo `.env` a partir do exemplo `.example.env`. Você pode usar o seguinte comando:
    ```bash
    cp .example.env .env
    ```
4.  Preencha as variáveis de ambiente no arquivo `.env` com os valores corretos para o seu ambiente.
5.  Instale as dependências do projeto:
    ```bash
    pnpm install
    ```
6.  Execute o servidor de desenvolvimento:
    ```bash
    pnpm dev
    ```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação.

## Estrutura de Pastas

A estrutura de pastas do projeto segue as convenções do Next.js App Router, organizada da seguinte forma:

```
web/
├── public/         # Arquivos estáticos (imagens, fontes, etc.)
├── src/
│   ├── app/        # Rotas da aplicação, layouts e páginas (App Router)
│   │   ├── api/    # API Routes para backend-for-frontend
│   │   ├── (admin)/# Grupo de rotas para a área administrativa
│   │   └── ...
│   ├── components/ # Componentes React reutilizáveis
│   │   ├── ui/     # Componentes de UI genéricos (shadcn/ui)
│   │   └── ...
│   ├── helpers/    # Funções auxiliares e utilitários
│   ├── hooks/      # Hooks React customizados
│   ├── interface/  # Definições de tipos e interfaces TypeScript
│   ├── lib/        # Configurações de bibliotecas e utilitários
│   ├── providers/  # Provedores de contexto React (React Query, Tema)
│   ├── schemas/    # Esquemas de validação (Zod)
│   ├── services/   # Lógica de comunicação com APIs externas
│   └── store/      # Lojas de estado global (Zustand)
└── ...
```

## Arquitetura e Layout

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) com [shadcn/ui](https://ui.shadcn.com/) para componentes de UI.
- **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) para o estado do carrinho e checkout.
- **Busca de Dados:** [React Query](https://tanstack.com/query/latest) (`@tanstack/react-query`) para caching e sincronização de dados do servidor.
- **Validação de Formulários e Dados:** [Zod](https://zod.dev/) para esquemas de validação.

A arquitetura é baseada em **React Server Components (RSC)** para a maior parte da renderização, o que melhora o desempenho ao mover a renderização para o servidor. Componentes que necessitam de interatividade no cliente são marcados com a diretiva `"use client"`.

O layout principal está definido em `src/app/layout.tsx`, e as páginas são construídas dentro do diretório `src/app`. A aplicação utiliza grupos de rotas, como `(admin)`, para organizar seções da aplicação sem afetar a URL.

---

# Cupcake Store - Frontend (EN-US)

This is the frontend project for the Cupcake Store, an e-commerce application for a cupcake shop.

## Getting Started

Follow these instructions to set up and run the project in your local development environment.

### Prerequisites

- Node.js (version 20.x or higher)
- pnpm (package manager)

### Installation

1.  Clone the repository.
2.  Navigate to the `web` folder.
3.  Create a `.env` file from the `.example.env` template. You can use the following command:
    ```bash
    cp .example.env .env
    ```
4.  Fill in the environment variables in the `.env` file with the correct values for your environment.
5.  Install the project dependencies:
    ```bash
    pnpm install
    ```
6.  Run the development server:
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Folder Structure

The project's folder structure follows the Next.js App Router conventions, organized as follows:

```
web/
├── public/         # Static files (images, fonts, etc.)
├── src/
│   ├── app/        # Application routes, layouts, and pages (App Router)
│   │   ├── api/    # API Routes for backend-for-frontend
│   │   ├── (admin)/# Route group for the admin area
│   │   └── ...
│   ├── components/ # Reusable React components
│   │   ├── ui/     # Generic UI components (shadcn/ui)
│   │   └── ...
│   ├── helpers/    # Helper functions and utilities
│   ├── hooks/      # Custom React hooks
│   ├── interface/  # TypeScript type and interface definitions
│   ├── lib/        # Library configurations and utilities
│   ├── providers/  # React context providers (React Query, Theme)
│   ├── schemas/    # Validation schemas (Zod)
│   ├── services/   # Logic for communicating with external APIs
│   └── store/      # Global state stores (Zustand)
└── ...
```

## Architecture and Layout

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) for UI components.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for cart and checkout state.
- **Data Fetching:** [React Query](https://tanstack.com/query/latest) (`@tanstack/react-query`) for server data caching and synchronization.
- **Form and Data Validation:** [Zod](https://zod.dev/) for validation schemas.

The architecture is based on **React Server Components (RSC)** for most of the rendering, which improves performance by moving rendering to the server. Components that require client-side interactivity are marked with the `"use client"` directive.

The main layout is defined in `src/app/layout.tsx`, and pages are built within the `src/app` directory. The application uses route groups, such as `(admin)`, to organize sections of the application without affecting the URL.
